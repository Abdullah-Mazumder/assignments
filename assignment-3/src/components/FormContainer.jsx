import { useState } from "react";
import { useDispatch } from "react-redux";
import shortid from "shortid";
import { addProduct } from "../redux/product/productsAction";
import Input from "./shared/Input";

const FormContainer = () => {
  const dispatch = useDispatch();
  const [productState, setProductState] = useState({
    productName: "",
    categoryName: "",
    imageLink: "",
    price: "",
    quantity: "",
  });
  const { productName, categoryName, imageLink, price, quantity } =
    productState;

  const inputHandler = (e) => {
    setProductState((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(addProduct({ ...productState, id: shortid.generate() }));
  };

  return (
    <div>
      <div className="formContainer">
        <h4 className="formTitle">Add New Product</h4>
        <form
          className="space-y-4 text-[#534F4F]"
          id="lws-addProductForm"
          onSubmit={submitHandler}
        >
          <Input
            id="lws-inputName"
            label="Product Name"
            type="text"
            name="productName"
            value={productName}
            onChange={inputHandler}
          />
          <Input
            id="lws-inputCategory"
            label="Category"
            type="text"
            name="categoryName"
            value={categoryName}
            onChange={inputHandler}
          />
          <Input
            id="lws-inputImage"
            label="Image Url"
            type="text"
            name="imageLink"
            value={imageLink}
            onChange={inputHandler}
          />

          <div className="grid grid-cols-2 gap-8 pb-4">
            <Input
              id="lws-inputPrice"
              label="Price"
              type="number"
              name="price"
              value={price}
              onChange={inputHandler}
            />
            <Input
              id="lws-inputQuantity"
              label="Quantity"
              type="number"
              name="quantity"
              value={quantity}
              onChange={inputHandler}
            />
          </div>

          <button type="submit" id="lws-inputSubmit" className="submit">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormContainer;
