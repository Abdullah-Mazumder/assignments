import { getJobs } from "./jobsApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { removeJob } from "../deleteJob/deleteJobSlice";

const initialState = {
  jobs: [],
  isLoading: true,
  isError: false,
  error: "",
};

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  return await getJobs();
});

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isError = false;
        state.error = "";
        state.jobs = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error?.message;
        state.jobs = [];
        state.isLoading = false;
      })
      .addCase(removeJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter((job) => job.id !== action.meta.arg);
      });
  },
});

export default jobsSlice.reducer;
