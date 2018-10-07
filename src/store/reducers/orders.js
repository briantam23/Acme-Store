import { LOAD_INITIAL_ORDERS, CREATE_LINE_ITEM, UPDATE_LINE_ITEM, UPDATE_ORDER, RESET_ORDERS } from '../constants';


const orderReducer = (state = [], action) => {
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
            console.log(cart, lineItems)
            return state.map(order => order.status !== 'CART' ? order : cart);
        /* case RESET_ORDERS:
            return action.orders; */
        default:
            return state;
    }
}

export default orderReducer;