import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  checkedProjects: [],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setCheckedProjects: (state, action) => {
      state.checkedProjects = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { setSearchTerm, setCheckedProjects } = filterSlice.actions;
