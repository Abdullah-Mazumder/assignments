import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRelatedPosts } from "./relatedPostsAPI";

const initialState = {
  relatedPosts: [],
  isLoading: false,
  isError: false,
  error: "",
};

// async thunk functions
export const fetchRelatedPosts = createAsyncThunk(
  "relatedPosts/fetchRelatedPosts",
  async ({ tags, id }) => {
    const relatedPosts = await getRelatedPosts({ tags, id });

    return relatedPosts;
  }
);

const relatedPostsSlice = createSlice({
  name: "relatedPosts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRelatedPosts.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchRelatedPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.relatedPosts = action.payload;
        state.isError = false;
      })
      .addCase(fetchRelatedPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.relatedPosts = [];
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default relatedPostsSlice.reducer;
