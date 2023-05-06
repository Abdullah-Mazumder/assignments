import {
  getBooksSuccess,
  setError,
  addNewBook,
  deleteBookWithId,
  updateBookWithId,
} from "./bookActionCreator";

export const getBooks = () => async (dispatch) => {
  try {
    const res = await fetch("http://localhost:9000/books");
    const books = await res.json();

    dispatch(getBooksSuccess(books));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const addBook = (book) => async (dispatch) => {
  try {
    const res = await fetch("http://localhost:9000/books", {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const newBook = await res.json();

    dispatch(addNewBook(newBook));
  } catch (error) {
    dispatch(setError("Failed to add book"));
  }
};

export const deleteBook = (bookId) => async (dispatch) => {
  try {
    await fetch(`http://localhost:9000/books/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    dispatch(deleteBookWithId(bookId));
  } catch (error) {
    dispatch(setError("Failed to delete book"));
  }
};

export const updateBook = (bookId, data) => async (dispatch) => {
  try {
    const res = await fetch(`http://localhost:9000/books/${bookId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const newBook = await res.json();

    dispatch(updateBookWithId(bookId, newBook));
  } catch (error) {
    dispatch(setError("Failed to update book"));
  }
};
