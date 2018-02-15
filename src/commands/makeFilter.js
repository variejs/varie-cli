const fs = require("fs-extra");
const camelCase = require("camelcase");
const replaceTextInFile = require("./../utilities/replaceTextInFile");
const tellUserFileExists = require("./../utilities/tellUserFileExists");

module.exports = function makeFilter(filterName, force) {
  let path = `./app/filters/${filterName}.ts`;
  tellUserFileExists(path, "filter", force).then(valid => {
    if (valid) {
      try {
        fs.copySync(`${__dirname}/../stubs/filter.ts`, path);
        replaceTextInFile(path, "temp", camelCase(filterName));
        console.info(`Filter created: ${path}`);
      } catch (err) {
        console.error(err);
      }
    }
  });
};
