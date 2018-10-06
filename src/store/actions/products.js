import { LOAD_INITIAL_PRODUCTS } from '../constants';
import axios from 'axios';


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