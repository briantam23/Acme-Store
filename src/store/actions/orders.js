import { LOAD_INITIAL_ORDERS, CREATE_LINE_ITEM, UPDATE_ORDER, RESET_ORDERS } from '../constants';
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
    return(
        dispatch => (
            axios.post(`/api/orders/${orderId}/lineItems`, lineItem)
                .then(res => res.data)
                .then(lineItem => dispatch(_createLineItem(lineItem)))
    )
)}

const _updateOrder = lineItem => ({
    type: UPDATE_ORDER,
    lineItem
})
export const updateOrder = (lineItem, orderId, _quantity) => {
    lineItem = { ...lineItem, quantity: _quantity + 1 };
    console.log(lineItem)
    return(
        dispatch => (
            axios.put(`/api/orders/${orderId}/lineItems/${lineItem.productId}`, lineItem)
                .then(res => res.data)
                .then(lineItem => dispatch(_updateOrder(lineItem)))
        )
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