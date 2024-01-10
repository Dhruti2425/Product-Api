import { ADD_CART, DELETE_CART } from '../action';

const initialValue = {
    count: JSON.parse(localStorage.getItem('Cart')) != null ? JSON.parse(localStorage.getItem('Cart')).length : 0
}

const CartReducer = (state = initialValue, action) => {
    switch (action.type) {
        case ADD_CART:
            return {
                ...state, count: state.count + 1
            }
        case DELETE_CART:
            return {
                ...state, count: state.count - 1
            }
        default:
            return state;
    }
}

export default CartReducer;