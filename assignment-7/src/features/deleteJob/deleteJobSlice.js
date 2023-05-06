import { deleteJob } from "./deleteJobApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  isSuccess: false,
};

export const removeJob = createAsyncThunk("job/deleteJob", async (id) => {
  return await deleteJob(id);
});

const deleteJobSlice = createSlice({
  name: "deleteJob",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(removeJob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
        state.isSuccess = false;
      })
      .addCase(removeJob.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.isSuccess = true;
      })
      .addCase(removeJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.isSuccess = false;
      });
  },
});

export default deleteJobSlice.reducer;
