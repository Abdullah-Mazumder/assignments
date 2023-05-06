import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
};

const filterTypeSlice = createSlice({
  name: "filterType",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export default filterTypeSlice.reducer;
export const { setSearchTerm } = filterTypeSlice.actions;
