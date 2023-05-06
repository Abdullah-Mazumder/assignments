import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import shortid from "shortid";
import Navbar from "./components/Navbar";
import Input from "./components/shared/Input";
import SingleBook from "./components/SingleBook";
import { addBook, getBooks, updateBook } from "./redux/book/bookThunk";

function App() {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.bookStore);
  const [isStatusFeatured, setIsStatusFeatured] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [formState, setFormState] = useState({
    name: "",
    author: "",
    thumbnail: "",
    price: "",
    rating: "",
    featured: false,
  });
  const { name, author, thumbnail, price, rating, featured } = formState;
  const [currentButtonStatus, setCurrentButtonStatus] = useState("addBook");

  const addOrUpdateBookHandler = (e) => {
    e.preventDefault();

    if (!name || !author || !thumbnail || !price || !rating) {
      alert("Please provide valid input");
      return;
    }

    if (currentButtonStatus === "addBook") {
      dispatch(
        addBook({
          ...formState,
          rating: Math.ceil(+formState.rating),
          id: shortid.generate(),
        })
      );

      setFormState({
        name: "",
        author: "",
        thumbnail: "",
        price: "",
        rating: "",
        featured: false,
      });
    }

    if (currentButtonStatus === "updateBook") {
      const data = JSON.parse(JSON.stringify(formState));
      delete data.id;
      data.rating = +formState.rating;
      dispatch(updateBook(formState.id, data));

      setCurrentButtonStatus("addBook");
      setFormState({
        name: "",
        author: "",
        thumbnail: "",
        price: "",
        rating: "",
        featured: false,
      });
    }
  };

  const inputHandler = (e) => {
    setFormState((prevState) => {
      if (e.target.name === "featured") {
        return {
          ...prevState,
          [e.target.name]: e.target.checked,
        };
      }
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    if (!loading) {
      setFilteredBooks(books);
    }
  }, [books, loading]);

  useEffect(() => {
    let anotherBooks = books;
    const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escapedTerm, "i");
    anotherBooks = anotherBooks.filter((book) => regex.test(book.name));

    if (isStatusFeatured) {
      setFilteredBooks(
        anotherBooks.filter((book) => book.featured === isStatusFeatured)
      );
    } else {
      setFilteredBooks(anotherBooks);
    }
  }, [isStatusFeatured, searchTerm]);

  useEffect(() => {
    dispatch(getBooks());
  }, []);
  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="py-12 2xl:px-6">
        <div className="container grid xl:grid-cols-[auto_350px] 2xl:grid-cols-[auto_400px] gap-4 2xl:gap-8">
          <div className="order-2 xl:-order-1">
            <div className="flex items-center justify-between mb-12">
              <h4 className="mt-2 text-xl font-bold">Book List</h4>

              <div className="flex items-center space-x-4">
                <button
                  className={`filter-btn ${
                    !isStatusFeatured && "active-filter"
                  }`}
                  id="lws-filterAll"
                  onClick={() => setIsStatusFeatured(false)}
                >
                  All
                </button>
                <button
                  className={`filter-btn ${
                    isStatusFeatured && "active-filter"
                  }`}
                  onClick={() => setIsStatusFeatured(true)}
                  id="lws-filterFeatured"
                >
                  Featured
                </button>
              </div>
            </div>

            {loading ? (
              <h1>Loading...</h1>
            ) : (
              <>
                {error ? (
                  <h1>{error}</h1>
                ) : (
                  <>
                    {filteredBooks.length === 0 ? (
                      <h1>No Books Found!</h1>
                    ) : (
                      <>
                        <div className="lws-bookContainer">
                          {filteredBooks.map((book, index) => (
                            <SingleBook
                              key={book.id}
                              book={book}
                              setCurrentButtonStatus={setCurrentButtonStatus}
                              setFormState={setFormState}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>

          <div>
            <div className="p-4 overflow-hidden bg-white shadow-cardShadow rounded-md">
              <h4 className="mb-8 text-xl font-bold text-center">
                Add New Book
              </h4>
              <form className="book-form" onSubmit={addOrUpdateBookHandler}>
                <Input
                  HTMLfor="name"
                  label="Book Name"
                  type="text"
                  id="input-Bookname"
                  name="name"
                  value={name}
                  onChange={inputHandler}
                />

                <Input
                  HTMLfor="category"
                  label="Author"
                  type="text"
                  id="input-Bookauthor"
                  name="author"
                  value={author}
                  onChange={inputHandler}
                />

                <Input
                  HTMLfor="image"
                  label="Image Url"
                  type="text"
                  id="input-Bookthumbnail"
                  name="thumbnail"
                  value={thumbnail}
                  onChange={inputHandler}
                />

                <div className="grid grid-cols-2 gap-8 pb-4">
                  <Input
                    HTMLfor="price"
                    label="Price"
                    type="number"
                    id="input-Bookprice"
                    name="price"
                    value={price}
                    onChange={inputHandler}
                  />

                  <Input
                    HTMLfor="quantity"
                    label="Rating"
                    type="number"
                    id="input-Bookrating"
                    name="rating"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={inputHandler}
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="input-Bookfeatured"
                    type="checkbox"
                    name="featured"
                    className="w-4 h-4"
                    checked={featured}
                    onChange={inputHandler}
                  />
                  <label htmlFor="featured" className="ml-2 text-sm">
                    {" "}
                    This is a featured book{" "}
                  </label>
                </div>

                <button type="submit" className="submit" id="submit">
                  {currentButtonStatus === "addBook"
                    ? "Add Book"
                    : "Update Book"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
