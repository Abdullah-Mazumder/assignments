import { useState } from "react";
import { Provider } from "react-redux";
import HomeOrCartContainer from "./components/HomeOrCartContainer";
import Navbar from "./components/Navbar";
import store from "./redux/store";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  return (
    <>
      <Provider store={store}>
        <Navbar setCurrentPage={setCurrentPage} />
        <HomeOrCartContainer currentPage={currentPage} />
      </Provider>
    </>
  );
}

export default App;
