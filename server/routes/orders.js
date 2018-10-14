const router = require('express').Router();
const { Order, LineItem, Product, User } = require('../db').models;
const { conn } = require('../db');


router.get('/', async (req, res, next) => {
    const attr = {
        status: 'CART'
    }
    try {
        let cart = await Order.findOne({ where: attr })
        if(!cart) {
            cart = await Order.create(attr);
        }
        const orders = await Order.findAll({
            include: [ LineItem ],
            order: [['createdAt', 'DESC']]
        })
        res.send(orders);
    }
    catch(ex) {
        next(ex)
    }
})

//create line item
router.post('/:orderId/lineItems', (req, res, next) => {
    LineItem.create({
        orderId: req.params.orderId,
        quantity: req.body.quantity,
        productId: req.body.productId
    })    
        .then(lineItem => res.send(lineItem))
        .catch(next)
})

//reset orders
router.put('/', (req, res, next) => {
    conn.sync({ force: true })
        .then(() => Promise.all([
            Product.create({ name: 'MacBook Air' }),
            Product.create({ name: 'iPhone 8' }),
            Product.create({ name: 'Hershel Backpack' }),
            User.create({ name: 'moe', password: 'm' }),
            User.create({ name: 'larry', password: 'l' }),
            User.create({ name: 'curly', password: 'c' })
        ]))
        .then(() => res.send())
        .catch(next)
})

//update order
router.put('/:id', (req, res, next) => {
    Order.findById(req.params.id)
        .then(order => order.update(req.body))
        .then(order => res.send(order))
        .catch(next)
})

//update line item
router.put('/:orderId/lineItems/:id', (req, res, next) => {
    LineItem.findById(req.params.id)
        .then(lineItem => lineItem.update(req.body))
        .then(lineItem=> res.send(lineItem))
        .catch(next)
})

//delete line item
router.delete('/:orderId/lineItems/:id', (req, res, next) => {
    LineItem.destroy({ where: { 
        orderId: req.params.orderId,
        id: req.params.id 
    }})
        .then(() => res.sendStatus(204))
        .catch(next)
})


module.exports = router;