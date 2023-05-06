import { useEffect } from "react";
import FormContainer from "./FormContainer";
import ProductContainer from "./ProductContainer";

const Home = () => {
  useEffect(() => {
    document.title = "LWS | Shopping Cart";
  }, []);
  return (
    <>
      <main className="py-16">
        <div className="productWrapper">
          <ProductContainer />

          <FormContainer />
        </div>
      </main>
    </>
  );
};

export default Home;
