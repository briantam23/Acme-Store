const router = require('express').Router();
const { User, Order, LineItem, Product } = require('../db').models;
const { conn } = require('../db');


router.get('/', (req, res, next) => {
    User.findAll()
        .then(users => res.send(users))
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => res.send(user))
        .catch(next)
})

router.get('/:id/orders', async (req, res, next) => {
    const attr = {
        status: 'CART'
    }
    const userId = {
        id: req.params.id
    }
    try {
        let cart = await Order.findOne({ 
            where: attr,
            include: [{
                model: User,
                where: userId
            }] 
        })
        if(!cart) {
            cart = await Order.create(attr);
            user = await User.findById(req.params.id);
            await cart.setUser(user);
        }
        const orders = await Order.findAll({
            include: [ 
                LineItem, 
                { 
                    model: User,
                    where: { id: req.params.id } 
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
router.post('/:id/orders/:orderId/lineItems', (req, res, next) => {
    LineItem.create({
        orderId: req.params.orderId,
        quantity: req.body.quantity,
        productId: req.body.productId
    })    
        .then(lineItem => res.send(lineItem))
        .catch(next)
})

//update order
router.put('/:id/orders/:orderId', (req, res, next) => {
    Order.findById(req.params.orderId)
        .then(order => order.update(req.body))
        .then(order => res.send(order))
        .catch(next)
})

//update line item
router.put('/:id/orders/:orderId/lineItems/:lineItemId', (req, res, next) => {
    LineItem.findById(req.params.lineItemId)
        .then(lineItem => lineItem.update(req.body))
        .then(lineItem=> res.send(lineItem))
        .catch(next)
})

//delete line item
router.delete('/:id/orders/:orderId/lineItems/:lineItemId', (req, res, next) => {
    LineItem.destroy({ where: { 
        orderId: req.params.orderId,
        id: req.params.id 
    }})
        .then(() => res.sendStatus(204))
        .catch(next)
})


module.exports = router;