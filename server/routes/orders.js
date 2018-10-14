const router = require('express').Router();
const { Order, LineItem, Product, User } = require('../db').models;
const { conn } = require('../db');


//get all orders
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

//reset orders
router.put('/', (req, res, next) => {
    conn.sync({ force: true })
        .then(() => Promise.all([
            User.create({ name: 'moe', password: 'm' }),
            User.create({ name: 'larry', password: 'l' }),
            User.create({ name: 'curly', password: 'c' })
        ]))
        .then(users => {
            Promise.all([
                Product.create({ name: 'MacBook Air' }),
                Product.create({ name: 'iPhone 8' }),
                Product.create({ name: 'Hershel Backpack' })
            ])
            return users;
        })
        .then(users => res.send(users))
        .catch(next)
})


module.exports = router;