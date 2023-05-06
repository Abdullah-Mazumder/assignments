import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterByLikeOrNewest: "",
  filterBySaveStatus: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilterByLikeOrNewest: (state, action) => {
      state.filterByLikeOrNewest = action.payload;
    },
    setFilterBySaveStatus: (state, action) => {
      state.filterBySaveStatus = action.payload;
    },
  },
});

export const { setFilterByLikeOrNewest, setFilterBySaveStatus } =
  filterSlice.actions;
export default filterSlice.reducer;
