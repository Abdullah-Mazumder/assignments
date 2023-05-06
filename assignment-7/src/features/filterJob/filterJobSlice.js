import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  sortingOption: "",
  jobType: "all",
};

const filterJobSlice = createSlice({
  name: "filterJob",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSortingOption: (state, action) => {
      state.sortingOption = action.payload;
    },
    setJobType: (state, action) => {
      state.jobType = action.payload;
    },
  },
});

export default filterJobSlice.reducer;
export const { setSearchTerm, setSortingOption, setJobType } =
  filterJobSlice.actions;
