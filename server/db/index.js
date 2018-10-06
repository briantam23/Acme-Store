const conn = require('./conn');
const Product = require('./models/Product');
const Order = require('./models/Order');
const LineItem = require('./models/LineItem');


LineItem.belongsTo(Product);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
//Product.hasMany(LineItem);

const syncAndSeed = () => {
    let macBookAir, iPhone8, hershelBackpack, cart, order, lineItem1, lineItem2, lineItem3;
    conn.sync({ force: true })
        .then(() => Promise.all([
            Product.create({ name: 'macBookAir' }),
            Product.create({ name: 'iPhone8' }),
            Product.create({ name: 'hershelBackpack' })
        ]))
        .then(products => {
            [macBookAir, iPhone8, hershelBackpack] = products;
            return Promise.all([
                Order.create({ status: 'CART' }),
                Order.create({ status: 'ORDER' })
            ])
        })
        .then(orders => {
            [cart, order] = orders;
            return Promise.all([
                LineItem.create({ quantity: 1 }),
                LineItem.create({ quantity: 2 }),
                LineItem.create({ quantity: 3 })
            ])
        })
        .then(lineItems => {
            [lineItem1, lineItem2, lineItem3] = lineItems;
            lineItem1.setProduct(macBookAir);
            lineItem2.setProduct(iPhone8);
            lineItem3.setProduct(hershelBackpack);
            lineItem1.setOrder(order);
            lineItem2.setOrder(cart);
            lineItem3.setOrder(cart);
        })
}


module.exports = {
    syncAndSeed,
    models: {
        Order,
        Product,
        LineItem
    }
}