import React from "react";
import { useSelector } from "react-redux";
import SingleProduct from "./SingleProduct";

const ProductContainer = () => {
  const { products } = useSelector((state) => state);
  return (
    <div className="productContainer" id="lws-productContainer">
      {products.length > 0 ? (
        <>
          {products.map((product) => (
            <SingleProduct key={product.id} product={product} />
          ))}
        </>
      ) : (
        <h1>No products found</h1>
      )}
    </div>
  );
};

export default ProductContainer;
