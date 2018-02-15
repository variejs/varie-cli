const chalk = require("chalk");
const fs = require("fs-extra");

function tellUserFileExists(path, type = "file", force) {
  return new Promise(resolve => {
    if (force) {
      return resolve(true);
    }
    return fs.pathExists(path, (err, exists) => {
      if (exists) {
        console.log(
          chalk.red(
            `This ${type} already exists. You can use --force to overwrite`
          )
        );
        resolve(false);
      }
      resolve(true);
    });
  });
}

module.exports = tellUserFileExists;
