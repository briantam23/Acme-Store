const router = require('express').Router();
const { User, Order, LineItem, Product } = require('../db').models;
const { conn } = require('../db');


//get users
router.get('/', (req, res, next) => {
    User.findAll()
        .then(users => res.send(users))
        .catch(next)
})

//get user by ID
router.get('/:userId', (req, res, next) => {
    User.findByPk(req.params.userId)
        .then(user => res.send(user))
        .catch(next)
})

//get orders by user ID
router.get('/:userId/orders', async (req, res, next) => {
    try {
        let cart = await Order.findOne({ 
            where: { status: 'CART' },
            include: [{
                model: User,
                where: { id: req.params.userId }
            }] 
        })
        if(!cart) {
            cart = await Order.create({ where: { status: 'CART' } });
            user = await User.findByPk(req.params.userId);
            await cart.setUser(user);
        }
        const orders = await Order.findAll({
            include: [ 
                LineItem, { 
                    model: User,
                    where: { id: req.params.userId } 
                }
            ],
            order: [['createdAt', 'DESC']]
        })
        res.send(orders);
    }
    catch(ex) {
        next(ex)
    }
})

//create line item
router.post('/:userId/orders/:orderId/lineItems', (req, res, next) => {
    LineItem.create({
        orderId: req.params.orderId,
        quantity: req.body.quantity,
        productId: req.body.productId
    })    
        .then(lineItem => res.send(lineItem))
        .catch(next)
})

//update order
router.put('/:userId/orders/:orderId', (req, res, next) => {
    Order.findByPk(req.params.orderId)
        .then(order => order.update({ ...req.body, userId: req.params.userId }))
        .then(order => res.send(order))
        .catch(next)
})

//update line item
router.put('/:userId/orders/:orderId/lineItems/:lineItemId', (req, res, next) => {
    LineItem.findByPk(req.params.lineItemId)
        .then(lineItem => lineItem.update(req.body))
        .then(lineItem=> res.send(lineItem))
        .catch(next)
})

//delete line item
router.delete('/:userId/orders/:orderId/lineItems/:lineItemId', (req, res, next) => {
    LineItem.destroy({ where: { 
        orderId: req.params.orderId,
        id: req.params.lineItemId 
    }})
        .then(() => res.sendStatus(204))
        .catch(next)
})


module.exports = router;