import { LOAD_INITIAL_ORDERS, CREATE_LINE_ITEM, UPDATE_LINE_ITEM, DELETE_LINE_ITEM ,UPDATE_ORDER, RESET_ORDERS } from '../constants';
import axios from 'axios';


const _loadInitialOrders = orders => ({
    type: LOAD_INITIAL_ORDERS,
    orders
})
export const loadInitialOrders = () => (
    dispatch => (
        axios.get('/api/orders')
            .then(res => res.data)
            .then(orders => dispatch(_loadInitialOrders(orders)))
    )
)

const _createLineItem = lineItem => ({
    type: CREATE_LINE_ITEM,
    lineItem
}) 
export const createLineItem = (product, orderId) => {
    let lineItem = { ...product, productId: product.id };
    console.log(lineItem)
    return(
        dispatch => (
            axios.post(`/api/orders/${orderId}/lineItems`, lineItem)
                .then(res => res.data)
                .then(lineItem => dispatch(_createLineItem(lineItem)))
    )
)}

const _updateLineItem = lineItem => ({
    type: UPDATE_LINE_ITEM,
    lineItem
})
export const updateLineItem = (lineItem, orderId, _quantity, change) => {
    lineItem = { ...lineItem, quantity: _quantity + change };
    return(
        dispatch => (
            axios.put(`/api/orders/${orderId}/lineItems/${lineItem.id}`, lineItem)
                .then(res => res.data)
                .then(lineItem => dispatch(_updateLineItem(lineItem)))
        )
    )
}

const _deleteLineItem = lineItem => ({
    type: DELETE_LINE_ITEM,
    lineItem
})
export const deleteLineItem = (lineItem, orderId) => (
    dispatch => (
        axios.delete(`/api/orders/${orderId}/lineItems/${lineItem.id}`)
            .then(() => dispatch(_deleteLineItem(lineItem)))
    )
)

const _updateOrder = orders => ({
    type: UPDATE_ORDER,
    orders: orders
})
export const updateOrder = cart => {
    const newOrder = { ...cart, status: 'ORDER' };
    return dispatch => (
        axios.put(`/api/orders/${cart.id}`, newOrder)
            .then(() => axios.get('/api/orders'))
            .then(res => res.data)
            .then(newOrders => dispatch(_updateOrder(newOrders)))
    )
}

const _resetOrders = orders => ({
    type: RESET_ORDERS,
    orders
})
export const resetOrders = () => (
    dispatch => (
        axios.put('/api/orders')
            .then(res => res.data)
            .then(orders => dispatch(_resetOrders(orders)))
    )
)