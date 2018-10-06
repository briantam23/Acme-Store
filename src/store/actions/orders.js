import { LOAD_INITIAL_ORDERS, UPDATE_LINE_ITEM } from '../constants';
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

const _updateLineItem = lineItem => ({
    type: UPDATE_LINE_ITEM,
    lineItem
})
export const updateLineItem = (product, change) => (
    dispatch => (
        axios.put('/api/orders/:orderId/lineItems/:id')
    )
)