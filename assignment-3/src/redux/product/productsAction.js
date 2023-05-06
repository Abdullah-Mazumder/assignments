import {
  ADD_PRODUCT,
  DECREMENT_PRODUCT_QTY,
  INCREMENT_PRODUCT_QTY,
} from "./productsConstants";

export const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
};

export const decrementProductQty = (productId) => {
  return {
    type: DECREMENT_PRODUCT_QTY,
    payload: productId,
  };
};

export const incrementProductQty = (idAndValue) => {
  return {
    type: INCREMENT_PRODUCT_QTY,
    payload: idAndValue,
  };
};
