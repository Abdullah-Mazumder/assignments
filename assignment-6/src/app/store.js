import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import postReducer from "../features/post/postSlice";
import relatedPostsReducer from "../features/relatedPosts/relatedPostsSlice";
import filterReducer from "../features/filters/filterSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    post: postReducer,
    relatedPosts: relatedPostsReducer,
    filter: filterReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
