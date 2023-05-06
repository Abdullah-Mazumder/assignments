require("util").inspect.defaultOptions.depth = null;
const store = require("./rtk/app/store");
const {
  fetchRandomVideo,
} = require("./rtk/features/randormVideo/randomVideoSlice");
const {
  fetchRelatedVideos,
} = require("./rtk/features/relatedVideos/relatedVideosSlice");

store.subscribe(() => {});

const fn = async () => {
  const data = await store.dispatch(fetchRandomVideo());
  store.dispatch(fetchRelatedVideos(data?.payload?.tags || []));
};

fn();
