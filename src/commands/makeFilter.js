const fs = require("fs-extra");
const camelCase = require("camelcase");
const replaceTextInFile = require("./../utilities/replaceTextInFile");
const tellUserFileExists = require("./../utilities/tellUserFileExists");

module.exports = function makeFilter(filterName, force) {
  let path = `${process.env.varie_path}/app/filters/${filterName}.ts`;
  tellUserFileExists(path, "filter", force).then((valid) => {
    if (valid) {
      try {
        fs.copySync(`${process.env.varie_vendor_path}/stubs/filter.ts`, path);
        replaceTextInFile(path, "temp", camelCase(filterName));
        console.info(`Filter created: ${path}`);
      } catch (err) {
        console.error(err);
      }
    }
  });
};
