import Cart from "./Cart";
import Home from "./Home";

const HomeOrCartContainer = ({ currentPage }) => {
  return <>{currentPage === "home" ? <Home /> : <Cart />}</>;
};

export default HomeOrCartContainer;
