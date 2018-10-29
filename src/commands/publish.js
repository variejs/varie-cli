const fs = require("fs-extra");

module.exports = function publish(packages) {
  packages.forEach((package) => {
    try {
      fs.copySync(`${process.env.node_modules_path}/${package}/publish`, process.env.varie_path);
      console.info(`Published Assets for ${package}`);
    } catch (err) {
      console.error(err);
    }
  });
};
