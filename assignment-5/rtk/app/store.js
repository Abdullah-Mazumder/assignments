const { configureStore } = require("@reduxjs/toolkit");
const { createLogger } = require("redux-logger");
const randormVideoReducer = require("../features/randormVideo/randomVideoSlice");
const relatedVideosReducer = require("../features/relatedVideos/relatedVideosSlice");

const logger = createLogger();

const store = configureStore({
  reducer: {
    randomVideo: randormVideoReducer,
    relatedVideos: relatedVideosReducer,
  },
  middleware: (getDefaultMiddlewares) => {
    return getDefaultMiddlewares().concat(logger);
  },
});

module.exports = store;
