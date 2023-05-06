const fetch = require("node-fetch");

const getRelatedVideos = async (tags) => {
  let queryString = tags.map((tag) => `tags_like=${tag}`).join("&");

  const response = await fetch("http://localhost:9000/videos?" + queryString);
  return await response.json();
};

module.exports = getRelatedVideos;
