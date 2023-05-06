/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditBookMutation, useGetBookQuery } from "../features/api/apiSlice";

const EditBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    data: book,
    error,
    refetch,
  } = useGetBookQuery(bookId);
  const [
    editBook,
    {
      isLoading: editBookLoading,
      isError: editBookIsError,
      error: editBookError,
      isSuccess,
    },
  ] = useEditBookMutation();
  const {
    id,
    name: bookName,
    author: bookAuthor,
    price: bookPrice,
    rating: bookRating,
    thumbnail: bookThumbnail,
    featured: bookFeatured,
  } = book || {};

  const [name, setName] = useState(bookName);
  const [author, setAuthor] = useState(bookAuthor);
  const [thumbnail, setThumbnail] = useState(bookThumbnail);
  const [price, setPrice] = useState(bookPrice);
  const [rating, setRating] = useState(bookRating);
  const [featured, setFeatured] = useState(bookFeatured);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (id) {
      setName(bookName);
      setAuthor(bookAuthor);
      setThumbnail(bookThumbnail);
      setPrice(bookPrice);
      setRating(bookRating);
      setFeatured(bookFeatured);
    }
  }, [
    bookName,
    bookAuthor,
    id,
    bookThumbnail,
    bookPrice,
    bookRating,
    bookFeatured,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    editBook({
      id: bookId,
      data: {
        name,
        author,
        thumbnail,
        price,
        rating: Math.ceil(+rating),
        featured,
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);
  return (
    <>
      <main className="py-6 2xl:px-6">
        <div className="container">
          <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
            <h4 className="mb-8 text-xl font-bold text-center">Edit Book</h4>
            {isError && <div>{error.error}</div>}
            {!isLoading && id && (
              <form className="book-form" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="lws-bookName">Book Name</label>
                  <input
                    required
                    className="text-input"
                    type="text"
                    id="lws-bookName"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="lws-author">Author</label>
                  <input
                    required
                    className="text-input"
                    type="text"
                    id="lws-author"
                    name="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="lws-thumbnail">Image Url</label>
                  <input
                    required
                    className="text-input"
                    type="text"
                    id="lws-thumbnail"
                    name="thumbnail"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-8 pb-4">
                  <div className="space-y-2">
                    <label htmlFor="lws-price">Price</label>
                    <input
                      required
                      className="text-input"
                      type="number"
                      id="lws-price"
                      name="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="lws-rating">Rating</label>
                    <input
                      required
                      className="text-input"
                      type="number"
                      id="lws-rating"
                      name="rating"
                      min="1"
                      max="5"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="lws-featured"
                    type="checkbox"
                    name="featured"
                    className="w-4 h-4"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                  />
                  <label htmlFor="lws-featured" className="ml-2 text-sm">
                    {" "}
                    This is a featured book{" "}
                  </label>
                </div>

                <button
                  disabled={editBookLoading}
                  type="submit"
                  className="submit"
                  id="lws-submit"
                >
                  Edit Book
                </button>
                {editBookIsError && <div>{editBookError.error}</div>}
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default EditBook;
