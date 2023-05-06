const fetch = require("node-fetch");

const getRandomVideo = async () => {
  const response = await fetch("http://localhost:9000/videos");
  return await response.json();
};

module.exports = getRandomVideo;
