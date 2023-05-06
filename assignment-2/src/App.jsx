import AllFlightsContainer from "./components/AllFlightsContainer";
import FlightInput from "./components/FlightInput";
import Header from "./components/Header";

import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <FlightInput />
      <AllFlightsContainer />
    </Provider>
  );
};

export default App;
