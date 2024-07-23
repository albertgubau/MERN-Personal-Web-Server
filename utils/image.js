const path = require("path");

function getImagePath(file) {
  const fileSplit = file.path.split(path.sep);

  return `${fileSplit[1]}/${fileSplit[2]}`;
}

module.exports = {
  getImagePath,
};
