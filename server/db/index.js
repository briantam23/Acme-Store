const conn = require('./conn');
const Product = require('./models/Product');
const Order = require('./models/Order');
const LineItem = require('./models/LineItem');


LineItem.belongsTo(Product);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);


const syncAndSeed = () => {
    let macBookAir, iPhone8, hershelBackpack, cart, order1, order2, 
        lineItem1, lineItem2, lineItem3, lineItem4, lineItem5;

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
                Order.create({ status: 'ORDER' }),
                Order.create({ status: 'ORDER' })
            ])
        })
        .then(orders => {
            [cart, order1, order2] = orders;
            return Promise.all([
                LineItem.create({ quantity: 1 }),
                LineItem.create({ quantity: 2 }),
                LineItem.create({ quantity: 3 }),
                LineItem.create({ quantity: 4 }),
                LineItem.create({ quantity: 5 })
            ])
        })
        .then(lineItems => {
            [lineItem1, lineItem2, lineItem3, lineItem4, lineItem5] = lineItems;
            Promise.all([
                lineItem1.setProduct(macBookAir),
                lineItem2.setProduct(iPhone8),
                lineItem3.setProduct(hershelBackpack),
                lineItem4.setProduct(macBookAir),
                lineItem5.setProduct(iPhone8),
                lineItem1.setOrder(order1),
                lineItem2.setOrder(order1),
                lineItem3.setOrder(cart),
                lineItem4.setOrder(cart),
                lineItem5.setOrder(order2)    
            ])
        })
}


module.exports = {
    syncAndSeed,
    models: {
        Order,
        Product,
        LineItem
    },
    conn
}