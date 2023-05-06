import { CREATE_FLIGHT, DELETE_FLIGHT } from "../actionTypes/flightActionTypes";

export const createFlight = (data) => {
  return {
    type: CREATE_FLIGHT,
    payload: data,
  };
};

export const deleteFlight = (id) => {
  return {
    type: DELETE_FLIGHT,
    payload: id,
  };
};
