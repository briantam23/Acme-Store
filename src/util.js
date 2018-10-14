export const selected = (_pathname, pathname, startsWith = false) => {
    if(_pathname === pathname || (pathname.indexOf(_pathname) === 0 && startsWith)) {
        return true;
    }
    return false;
}

export const findProductNameById = (products, id) => (
    products.find(product => product.id === id).name
)

export const findFinishedOrders = orders => (
    orders.filter(order => order.status === 'ORDER')
)

export const findPendingOrder = orders => (
    orders.find(order => order.status === 'CART')
)

export const findOrderedCount = finishedOrders => {
    let orderedCount = 0;
    for(let i = 0; i < finishedOrders.length; i++) {
        for(let j = 0; j < finishedOrders[i].lineItems.length; j++) {
            orderedCount += finishedOrders[i].lineItems[j].quantity;
        }
    }
    return orderedCount;
}

export const findCartCount = cartOrder => (
    cartOrder.lineItems.reduce((acc, cur) => acc += cur.quantity, 0)
)

export const findLineItemById = (cart, product) => (
    cart.lineItems.find(lineItem => lineItem.productId === product.id)
)

export const findUserByName = (users, name) => (
    users.data.find(user => user.name === name)
)