import React, { useState } from "react";
import { useSelector } from "react-redux";
import SingleBook from "../components/SingleBook";
import { useGetBooksQuery } from "../features/api/apiSlice";

const Home = () => {
  const { isLoading, isError, data: books, error } = useGetBooksQuery();
  const { searchTerm } = useSelector((state) => state.filterType);
  const [isFeaturedBook, setIsFeaturedBook] = useState(false);

  // filter with searchTerm
  const filterWithSearchTerm = () => {
    return books.filter((book) => {
      return book.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  // flter with featured book
  const filterWithFeaturedBooks = (book) => {
    if (isFeaturedBook) {
      return book.featured;
    }
    return true;
  };

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h1>Loading...</h1>;
  }

  if (!isLoading && isError) {
    content = <h1>{error.error}</h1>;
  }

  if (
    !isError &&
    !isLoading &&
    filterWithSearchTerm().filter(filterWithFeaturedBooks).length === 0
  ) {
    content = <h1>No Books Found!</h1>;
  }

  if (
    !isError &&
    !isLoading &&
    filterWithSearchTerm().filter(filterWithFeaturedBooks).length > 0
  ) {
    content = filterWithSearchTerm()
      .filter(filterWithFeaturedBooks)
      .map((book) => <SingleBook key={book.id} book={book} />);
  }

  return (
    <>
      <main className="py-12 px-6 2xl:px-6 container">
        <div className="order-2 xl:-order-1">
          <div className="flex items-center justify-between mb-12">
            <h4 className="mt-2 text-xl font-bold">Book List</h4>

            <div className="flex items-center space-x-4">
              <button
                className={`lws-filter-btn ${
                  !isFeaturedBook && "active-filter"
                }`}
                onClick={() => setIsFeaturedBook(false)}
              >
                All
              </button>
              <button
                className={`lws-filter-btn ${
                  isFeaturedBook && "active-filter"
                }`}
                onClick={() => setIsFeaturedBook(true)}
              >
                Featured
              </button>
            </div>
          </div>

          <div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
            {content}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
