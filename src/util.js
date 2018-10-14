export const selected = (_pathname, pathname, startsWith = false) => {
    if(_pathname === pathname || (pathname.indexOf(_pathname) === 0 && startsWith)) {
        return true;
    }
    return false;
}

export const findProductNameById = (products, id) => (
    products.find(product => product.id === id).name
)

export const findFinishedOrders = (orders, auth) => {
    if(auth) return orders.filter(order => order.status === 'ORDER' && auth.id === userId);
}

export const findPendingOrder = orders => (
    orders.find(order => order.status === 'CART')
)

export const findOrderedCount = finishedOrders => {
    let orderedCount = 0;
    if(finishedOrders) {
        for(let i = 0; i < finishedOrders.length; i++) {
            for(let j = 0; j < finishedOrders[i].lineItems.length; j++) {
                orderedCount += finishedOrders[i].lineItems[j].quantity;
            }
        }
    }
    return orderedCount;
}

export const findCartCount = cartOrder => {
    if(cartOrder) return cartOrder.lineItems.reduce((acc, cur) => acc += cur.quantity, 0);
}

export const findLineItemById = (cart, product) => {
    if(cart) return cart.lineItems.find(lineItem => lineItem.productId === product.id);
}