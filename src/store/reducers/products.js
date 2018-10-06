import { LOAD_INITIAL_PRODUCTS } from '../constants';


const productReducer = (state = [], action) => {
    switch(action.type) {
        case LOAD_INITIAL_PRODUCTS:
            return action.products;
        default:
            return state;
    }
}


export default productReducer;