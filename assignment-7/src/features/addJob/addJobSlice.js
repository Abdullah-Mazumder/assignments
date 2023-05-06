import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addJob } from "./addJobApi";

const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  isSuccess: false,
};

export const createJob = createAsyncThunk("job/addJob", async (job) => {
  return await addJob(job);
});

const addJobSlice = createSlice({
  name: "addJob",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
        state.isSuccess = false;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.isSuccess = true;
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.isSuccess = false;
      });
  },
});

export default addJobSlice.reducer;
