import { LOAD_INITIAL_ORDERS,LOAD_INITIAL_PRODUCTS } from '../constants';
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


const _loadInitialProducts = products => ({
    type: LOAD_INITIAL_PRODUCTS,
    products
})
export const loadInitialProducts = () => (
    dispatch => (
        axios.get('/api/products')
            .then(res => res.data)
            .then(products => dispatch(_loadInitialProducts(products)))
    )
)