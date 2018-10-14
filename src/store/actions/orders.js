import { LOAD_INITIAL_ORDERS, CREATE_LINE_ITEM, UPDATE_LINE_ITEM, DELETE_LINE_ITEM ,UPDATE_ORDER, RESET_ORDERS } from '../constants';
import axios from 'axios';
import { findUserByName } from '../../util';


const _loadInitialOrders = orders => ({
    type: LOAD_INITIAL_ORDERS,
    orders
})
export const loadInitialOrders = userId => (
    dispatch => {
        if(userId) {
            return axios.get(`/api/users/${userId}/orders`)
                .then(res => res.data)
                .then(orders => dispatch(_loadInitialOrders(orders)))
        }
        else {
            return axios.get(`/api/orders`)
                .then(res => res.data)
                .then(orders => dispatch(_loadInitialOrders(orders)))
        }
    }
)

const _createLineItem = lineItem => ({
    type: CREATE_LINE_ITEM,
    lineItem
}) 
export const createLineItem = (product, orderId) => {
    let lineItem = { ...product, productId: product.id }, userId;
    return(
        dispatch => (
            axios.post(`/api/users/${userId}/orders/${orderId}/lineItems`, lineItem)
                .then(res => res.data)
                .then(lineItem => dispatch(_createLineItem(lineItem)))
    )
)}

const _updateLineItem = lineItem => ({
    type: UPDATE_LINE_ITEM,
    lineItem
})
export const updateLineItem = (lineItem, orderId, _quantity, change) => {
    let userId;
    lineItem = { ...lineItem, quantity: _quantity + change };
    return(
        dispatch => (
            axios.put(`/api/users/${userId}/orders/${orderId}/lineItems/${lineItem.id}`, lineItem)
                .then(res => res.data)
                .then(lineItem => dispatch(_updateLineItem(lineItem)))
        )
    )
}

const _deleteLineItem = lineItem => ({
    type: DELETE_LINE_ITEM,
    lineItem
})
export const deleteLineItem = (lineItem, orderId) => {
    let userId;
    return dispatch => (
        axios.delete(`/api/users/${userId}/orders/${orderId}/lineItems/${lineItem.id}`)
            .then(() => dispatch(_deleteLineItem(lineItem)))
    )
}

const _updateOrder = (orders, userId) => ({
    type: UPDATE_ORDER,
    orders,
    userId
})
export const updateOrder = cart => {
    const newOrder = { ...cart, status: 'ORDER' };
    return dispatch => (
        axios.put(`/api/users/${cart.userId}/orders/${cart.id}`, newOrder)
            .then(() => axios.get(`/api/users/${cart.userId}/orders`))
            .then(res => res.data)
            .then(newOrders => dispatch(_updateOrder(newOrders, cart.userId)))
    )
}

const _resetOrders = orders => ({
    type: RESET_ORDERS,
    orders
})
export const resetOrders = name => (
    dispatch => (
        axios.put('/api/orders')
            .then(users => {
                const user = findUserByName(users, name);
                return axios.get(`/api/users/${user.id}/orders`);
            })
            .then(res => res.data)
            .then(orders => dispatch(_resetOrders(orders)))
    )
)