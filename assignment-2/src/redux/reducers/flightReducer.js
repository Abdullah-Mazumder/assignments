import { CREATE_FLIGHT, DELETE_FLIGHT } from "../actionTypes/flightActionTypes";

const initialState = {
  allFlights: {},
};

const allFlightsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  let copiedState;

  switch (type) {
    case CREATE_FLIGHT:
      copiedState = JSON.parse(JSON.stringify(state));
      const id = Date.now();
      copiedState.allFlights[id] = {
        id,
        ...payload,
      };
      return copiedState;

    case DELETE_FLIGHT:
      copiedState = JSON.parse(JSON.stringify(state));
      delete copiedState.allFlights[payload];
      return copiedState;

    default:
      return { ...state };
  }
};

export default allFlightsReducer;
