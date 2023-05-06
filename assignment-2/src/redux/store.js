import { createStore } from "redux";
import flightReducer from "./reducers/flightReducer";

const store = createStore(flightReducer);
export default store;
