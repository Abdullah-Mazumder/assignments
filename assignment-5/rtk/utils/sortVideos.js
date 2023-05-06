const convertViewsStrToNumber = require("./convertViewsStrToNumber");

const sortVideos = (videos) => {
  return videos.sort((v1, v2) => {
    return (
      convertViewsStrToNumber(v2.views) - convertViewsStrToNumber(v1.views)
    );
  });
};

module.exports = sortVideos;
