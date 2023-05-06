import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { editJob, getAJob } from "./editJobAPI";
const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  isSuccess: false,
  job: {},
};

export const updatedJob = createAsyncThunk(
  "job/update",
  async ({ id, data }) => {
    return await editJob(id, data);
  }
);

export const getSingleJob = createAsyncThunk("job/getSingleJob", async (id) => {
  return await getAJob(id);
});

const editJobSlice = createSlice({
  name: "editJob",
  initialState,
  reducers: {
    setIsSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
    clearError: (state) => {
      state.isError = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatedJob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
        state.isSuccess = false;
      })
      .addCase(updatedJob.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.isSuccess = true;
      })
      .addCase(updatedJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.isSuccess = false;
      })
      .addCase(getSingleJob.fulfilled, (state, action) => {
        state.job = action.payload;
      })
      .addCase(getSingleJob.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error?.message;
        state.isSuccess = false;
        state.job = {};
      });
  },
});

export default editJobSlice.reducer;
export const { setIsSuccess, clearError } = editJobSlice.actions;
