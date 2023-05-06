import React from "react";
import { useDispatch } from "react-redux";
import { addToCART } from "../redux/cart/cartAction";
import { decrementProductQty } from "../redux/product/productsAction";

const SingleProduct = ({ product }) => {
  const dispatch = useDispatch();
  const { productName, categoryName, imageLink, price, quantity, id } = product;

  const addToCartHandler = () => {
    dispatch(
      addToCART({
        id,
        productName,
        categoryName,
        imageLink,
        price,
        totalQuantity: +quantity,
      })
    );
    dispatch(decrementProductQty(id));
  };

  return (
    <div className="lws-productCard">
      <img className="lws-productImage" src={imageLink} alt="product" />
      <div className="p-4 space-y-2">
        <h4 className="lws-productName">{productName}</h4>
        <p className="lws-productCategory">{categoryName}</p>
        <div className="flex items-center justify-between pb-2">
          <p className="productPrice">
            BDT <span className="lws-price">{price}</span>
          </p>
          <p className="productQuantity">
            QTY <span className="lws-quantity">{quantity}</span>
          </p>
        </div>
        <button
          className="lws-btnAddToCart"
          onClick={addToCartHandler}
          disabled={quantity <= 0}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
