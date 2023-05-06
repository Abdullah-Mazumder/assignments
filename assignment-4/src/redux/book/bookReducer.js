import {
  ADD_BOOK,
  DELETE_BOOK,
  GET_BOOKS_SUCCESS,
  SET_BOOKS_LOADING,
  SET_ERROR,
  UPDATE_BOOK,
} from "./bookConstants";

const initialState = {
  error: "",
  books: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_BOOKS_SUCCESS:
      return {
        ...state,
        error: "",
        books: payload,
        loading: false,
      };

    case ADD_BOOK:
      return {
        error: "",
        loading: false,
        books: [...state.books, payload],
      };

    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter((book) => book.id !== payload),
      };

    case UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map((book) => {
          if (book.id != payload.bookId) {
            return book;
          }
          return {
            ...book,
            ...payload.data,
          };
        }),
      };

    case SET_BOOKS_LOADING:
      return {
        ...state,
        error: "",
        loading: payload,
      };

    case SET_ERROR:
      return {
        error: payload,
        loading: false,
        books: [],
      };

    default:
      return state;
  }
}
