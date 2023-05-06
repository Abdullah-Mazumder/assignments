import {
  ADD_TO_CART,
  DECREMENT_CART_PRODUCT_QTY,
  INCREMENT_CART_PRODUCT_QTY,
  REMOVE_FROM_CART,
} from "./cartConstants";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  const copiedState = JSON.parse(JSON.stringify(state));
  switch (type) {
    case ADD_TO_CART:
      if (copiedState[payload.id]) {
        copiedState[payload.id].quantity = state[payload.id].quantity + 1;
        copiedState[payload.id].totalQuantity--;
      } else {
        copiedState[payload.id] = { ...payload, quantity: 1 };
        copiedState[payload.id].totalQuantity--;
      }
      return copiedState;

    case REMOVE_FROM_CART:
      delete copiedState[payload];
      return copiedState;

    case DECREMENT_CART_PRODUCT_QTY:
      copiedState[payload].quantity--;
      copiedState[payload].totalQuantity++;
      return copiedState;

    case INCREMENT_CART_PRODUCT_QTY:
      copiedState[payload].quantity++;
      copiedState[payload].totalQuantity--;
      return copiedState;

    default:
      return state;
  }
}
