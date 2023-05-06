import {
  ADD_BOOK,
  DELETE_BOOK,
  GET_BOOKS_SUCCESS,
  SET_ERROR,
  UPDATE_BOOK,
} from "./bookConstants";

export const getBooksSuccess = (data) => {
  return {
    type: GET_BOOKS_SUCCESS,
    payload: data,
  };
};

export const setError = (err) => {
  return {
    type: SET_ERROR,
    payload: err || "Something went wrong!",
  };
};

export const addNewBook = (book) => {
  return {
    type: ADD_BOOK,
    payload: book,
  };
};

export const deleteBookWithId = (bookId) => {
  return {
    type: DELETE_BOOK,
    payload: bookId,
  };
};

export const updateBookWithId = (bookId, data) => {
  return {
    type: UPDATE_BOOK,
    payload: { bookId, data },
  };
};
