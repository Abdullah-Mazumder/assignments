import {
  ADD_PRODUCT,
  DECREMENT_PRODUCT_QTY,
  INCREMENT_PRODUCT_QTY,
} from "./productsConstants";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_PRODUCT:
      return [...state, payload];

    case DECREMENT_PRODUCT_QTY:
      return state.map((product) => {
        if (product.id === payload) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      });

    case INCREMENT_PRODUCT_QTY:
      return state.map((product) => {
        if (product.id === payload.id) {
          return {
            ...product,
            quantity: product.quantity + +payload.value,
          };
        }
        return product;
      });

    default:
      return state;
  }
}
