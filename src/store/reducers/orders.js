import { LOAD_INITIAL_ORDERS } from '../constants';


const orderReducer = (state = [], action) => {
    switch(action.type) {
        case LOAD_INITIAL_ORDERS:
            return action.orders;
        default:
            return state;
    }
}

export default orderReducer;