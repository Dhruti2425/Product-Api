import { createStore } from "redux";
import CartReducer from "./Reducers/CartReducer";

const store = createStore(CartReducer);

export default store;