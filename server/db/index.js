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
            Product.create({ name: 'MacBook Air' }),
            Product.create({ name: 'iPhone 8' }),
            Product.create({ name: 'Hershel Backpack' })
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
            lineItem1.setOrder(cart);
            lineItem2.setOrder(order);
            lineItem3.setOrder(order);
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