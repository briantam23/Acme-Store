const router = require('express').Router();
const { Product } = require('../db').models;


router.get('/', (req, res, next) => {
    Product.findAll()
        .then(products => res.send(products))
        .catch(next)
})


module.exports = router;