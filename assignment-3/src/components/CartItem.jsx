import { useDispatch } from "react-redux";
import {
  decrementCartProductQty,
  incrementCartProductQty,
  removeFromCart,
} from "../redux/cart/cartAction";
import {
  decrementProductQty,
  incrementProductQty,
} from "../redux/product/productsAction";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const {
    id,
    productName,
    categoryName,
    imageLink,
    price,
    totalQuantity,
    quantity,
  } = item;

  const incrementCartProdQtyHandler = (id) => {
    // this is for increasing product quantity in cart
    dispatch(incrementCartProductQty(id));

    // this is for decreasing product quantity. because when user will increase the quantity of the product in cart then this action will decrease the quantity of the product in product reducer
    dispatch(decrementProductQty(id));
  };

  const decrementCartProdQtyHandler = (id) => {
    // this is for decreasing product quantity in cart
    dispatch(decrementCartProductQty(id));

    // this is for increasing product quantity. because when user will decrease the quantity of the product in cart then this action will increase the quantity of the product in product reducer
    dispatch(incrementProductQty({ id, value: 1 }));
  };

  const deleteProductFromCart = (id) => {
    dispatch(removeFromCart(id));

    // this is for increasing product quantity. because when user will delete the product in cart then this action will increase the quantity of the product in product reducer
    dispatch(incrementProductQty({ id, value: +quantity }));
  };

  return (
    <div className="cartCard">
      <div className="flex items-center col-span-6 space-x-6">
        <img className="lws-cartImage" src={imageLink} alt="product" />

        <div className="space-y-2">
          <h4 className="lws-cartName">{productName}</h4>
          <p className="lws-cartCategory">{categoryName}</p>
          <p>
            BDT <span className="lws-cartPrice">{price}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center col-span-4 mt-4 space-x-8 md:mt-0">
        <div className="flex items-center space-x-4">
          <button
            className="lws-incrementQuantity"
            disabled={+totalQuantity <= 0}
            onClick={() => incrementCartProdQtyHandler(id)}
          >
            <i className="text-lg fa-solid fa-plus"></i>
          </button>
          <span className="lws-cartQuantity">{quantity}</span>
          <button
            className="lws-decrementQuantity"
            disabled={+quantity <= 1}
            onClick={() => decrementCartProdQtyHandler(id)}
          >
            <i className="text-lg fa-solid fa-minus"></i>
          </button>
        </div>

        <p className="text-lg font-bold">
          BDT <span className="lws-calculatedPrice">{+price * +quantity}</span>
        </p>
      </div>

      <div className="flex items-center justify-center col-span-2 mt-4 md:justify-end md:mt-0">
        <button
          className="lws-removeFromCart"
          onClick={() => deleteProductFromCart(id)}
        >
          <i className="text-lg text-red-400 fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
