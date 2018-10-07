import { LOAD_INITIAL_ORDERS, CREATE_LINE_ITEM, UPDATE_LINE_ITEM, DELETE_LINE_ITEM, UPDATE_ORDER, RESET_ORDERS } from '../constants';


const ordersReducer = (state = [], action) => {
    let cart = state.find(order => order.status === 'CART');
    switch(action.type) {
        case LOAD_INITIAL_ORDERS:
            return action.orders;
        case CREATE_LINE_ITEM:
            let lineItems = [...cart.lineItems, action.lineItem];
            cart = { ...cart, lineItems };
            return state.map(order => order.status !== 'CART' ? order : cart);
        case UPDATE_LINE_ITEM:
            lineItems = cart.lineItems.map(_lineItem => _lineItem.id !== action.lineItem.id ? _lineItem : action.lineItem);
            cart = { ...cart, lineItems };
            return state.map(order => order.status !== 'CART' ? order : cart);
        case DELETE_LINE_ITEM:
            lineItems = cart.lineItems.filter(_lineItems => _lineItems !== action.lineItem);
            cart = { ...cart, lineItems };
            return state.map(order => order.status !== 'CART' ? order : cart);
        case UPDATE_ORDER:
            return action.orders;
        case RESET_ORDERS:
            return action.orders;
        default:
            return state;
    }
}

export default ordersReducer;