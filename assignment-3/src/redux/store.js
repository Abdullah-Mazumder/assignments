import { createStore, combineReducers } from "redux";
import cartReducer from "./cart/cartReducer";
import productReducer from "./product/productReducer";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
});

const store = createStore(rootReducer);

export default store;
