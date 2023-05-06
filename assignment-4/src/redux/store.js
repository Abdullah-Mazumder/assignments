import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import bookReducer from "./book/bookReducer";

const rootReducer = combineReducers({
  bookStore: bookReducer,
});

const store = createStore(
  rootReducer,
  // composeWithDevTools(applyMiddleware(thunk))
  applyMiddleware(thunk)
);

export default store;
