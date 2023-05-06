const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const sortVideos = require("../../utils/sortVideos");
const getRelatedVideos = require("./relatedVideosAPI");

// initialize the default state
const initialState = {
  isLoading: false,
  relatedVideos: [],
  error: "",
};

// create async thunk
const fetchRelatedVideos = createAsyncThunk(
  "videos/relatedVideos",
  async (tags) => {
    const relatedVideos = await getRelatedVideos(tags);
    return relatedVideos;
  }
);

const relatedVideosSlice = createSlice({
  name: "relatedVideos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRelatedVideos.pending, (state) => {
        state.isLoading = true;
        state.relatedVideos = [];
        state.error = "";
      })
      .addCase(fetchRelatedVideos.fulfilled, (state, action) => {
        state.error = "";
        state.isLoading = false;
        const sortedRelatedVideos = sortVideos(action.payload);
        // just checking is it perfectly sorting?
        // console.log("sortedRelatedVideos", sortedRelatedVideos);
        state.relatedVideos = sortedRelatedVideos;
      })
      .addCase(fetchRelatedVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message;
        state.relatedVideos = [];
      });
  },
});

module.exports = relatedVideosSlice.reducer;
module.exports.fetchRelatedVideos = fetchRelatedVideos;
