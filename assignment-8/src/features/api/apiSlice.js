import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  tagTypes: ["books"],
  endpoints: (builder) => {
    return {
      getBooks: builder.query({
        query: () => "/books",
        keepUnusedDataFor: 600,
        providesTags: ["books"],
      }),

      addBook: builder.mutation({
        query: (data) => ({
          url: "/books",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["books"],
      }),

      getBook: builder.query({
        query: (videoId) => `/books/${videoId}`,
      }),

      editBook: builder.mutation({
        query: ({ id, data }) => ({
          url: `/books/${id}`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ["books"],
      }),

      deleteBook: builder.mutation({
        query: (id) => ({
          url: `/books/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["books"],
      }),
    };
  },
});

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useEditBookMutation,
  useGetBookQuery,
  useDeleteBookMutation,
} = apiSlice;
