import {
  ADD_TO_CART,
  DECREMENT_CART_PRODUCT_QTY,
  INCREMENT_CART_PRODUCT_QTY,
  REMOVE_FROM_CART,
} from "./cartConstants";

export const addToCART = (item) => {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};

export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
};

export const incrementCartProductQty = (productId) => {
  return {
    type: INCREMENT_CART_PRODUCT_QTY,
    payload: productId,
  };
};

export const decrementCartProductQty = (productId) => {
  return {
    type: DECREMENT_CART_PRODUCT_QTY,
    payload: productId,
  };
};
