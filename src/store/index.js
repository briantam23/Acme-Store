import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import productReducer from './reducers/products';
import orderReducer from './reducers/orders';


const reducer = combineReducers({
    products: productReducer,
    orders: orderReducer
})

const store = createStore(reducer, applyMiddleware(thunk, logger ));


export default store;