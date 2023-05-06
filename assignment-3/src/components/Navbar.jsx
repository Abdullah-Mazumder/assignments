import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import logo from "../images/logo.png";

const Navbar = ({ setCurrentPage }) => {
  const { cart } = useSelector((state) => state);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    setTotalProducts(
      Object.keys(cart).reduce(
        (result, current) => result + +cart[current].quantity,
        0
      )
    );
  }, [cart]);

  return (
    <nav className="bg-[#171C2A] py-4">
      <div className="navBar">
        <div>
          <img src={logo} alt="LWS" className="max-w-[140px]" />
        </div>

        <div className="flex gap-4">
          <div
            className="navHome"
            id="lws-home"
            style={{ cursor: "pointer" }}
            onClick={() => setCurrentPage("home")}
          >
            {" "}
            Home{" "}
          </div>
          <div
            className="navCart"
            id="lws-cart"
            style={{ cursor: "pointer" }}
            onClick={() => setCurrentPage("cart")}
          >
            <i className="text-xl fa-sharp fa-solid fa-bag-shopping"></i>
            <span id="lws-totalCart">{totalProducts}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
