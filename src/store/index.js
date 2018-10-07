import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import productsReducer from './reducers/products';
import ordersReducer from './reducers/orders';


const reducer = combineReducers({
    products: productsReducer,
    orders: ordersReducer
})

const store = createStore(reducer, applyMiddleware(thunk, logger ));


export default store;