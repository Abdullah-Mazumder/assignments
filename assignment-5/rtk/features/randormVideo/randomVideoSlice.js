const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const getRandomVideo = require("./randomVideoAPI");

// initialize the default state
const initialState = {
  isLoading: false,
  video: {},
  error: "",
};

// create async thunk
const fetchRandomVideo = createAsyncThunk("video/randomVideo", async () => {
  const video = await getRandomVideo();
  return video;
});

const randomVideoSlice = createSlice({
  name: "randomVideo",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomVideo.pending, (state) => {
        state.isLoading = true;
        state.video = {};
        state.error = "";
      })
      .addCase(fetchRandomVideo.fulfilled, (state, action) => {
        state.error = "";
        state.isLoading = false;
        state.video = action.payload;
      })
      .addCase(fetchRandomVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message;
        state.video = {};
      });
  },
});

module.exports = randomVideoSlice.reducer;
module.exports.fetchRandomVideo = fetchRandomVideo;
