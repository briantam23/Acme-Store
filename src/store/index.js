import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import productsReducer from './reducers/products';
import ordersReducer from './reducers/orders';
import authReducer from './reducers/auth';


const reducer = combineReducers({
    products: productsReducer,
    orders: ordersReducer,
    auth: authReducer
})

const store = createStore(reducer, applyMiddleware(thunk, logger ));


export default store;