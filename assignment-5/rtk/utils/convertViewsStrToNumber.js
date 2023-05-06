const convertViewsStrToNumber = (views) => {
  return +views.split("k")[0];
};

module.exports = convertViewsStrToNumber;
