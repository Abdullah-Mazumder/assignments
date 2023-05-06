import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPost, giveLike, changeSaveStatus } from "./postApi";

const initialState = {
  post: {},
  isLoading: false,
  isError: false,
  error: "",
};

// async thunk functions
export const fetchPost = createAsyncThunk("post/fetchPost", async (id) => {
  const post = await getPost(id);
  return post;
});

export const giveLikeHandler = createAsyncThunk(
  "relatedPosts/giveLike",
  async ({ id, value }) => {
    const updatedLikes = await giveLike(id, value);
    return updatedLikes;
  }
);

export const toggleSaveStatus = createAsyncThunk(
  "relatedPosts/toogleSaveStatus",
  async ({ id, value }) => {
    const updatedSaveStatus = await changeSaveStatus(id, value);
    return updatedSaveStatus;
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
        state.isError = false;
        state.error = "";
      })
      .addCase(fetchPost.rejected, (state, action) => {
        setErrorStatus(state, action);
      })
      .addCase(giveLikeHandler.fulfilled, (state, action) => {
        state.post.likes = action.payload;
      })
      .addCase(giveLikeHandler.rejected, (state, action) => {
        setErrorStatus(state, action);
      })
      .addCase(toggleSaveStatus.fulfilled, (state, action) => {
        state.post.isSaved = action.payload;
      })
      .addCase(toggleSaveStatus.rejected, (state, action) => {
        setErrorStatus(state, action);
      });
  },
});

const setErrorStatus = (state, action) => {
  state.isLoading = false;
  state.post = {};
  state.isError = true;
  state.error = action.error?.message;
};

export default postSlice.reducer;
