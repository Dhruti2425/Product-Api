import { ADD_CART, DELETE_CART } from '../action';

export const addtocart = () => {
    return {
        type: ADD_CART
    }
}

export const deleteCart = () => {
    return {
        type: DELETE_CART
    }
}