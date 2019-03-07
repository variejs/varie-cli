let findup = require("findup-sync");

module.exports = function findNodeModules() {
  return findup("node_modules");
};
