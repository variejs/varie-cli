const fs = require("fs-extra");
const camelCase = require("camelcase");
const replaceTextInFile = require("./../utilities/replaceTextInFile");
const tellUserFileExists = require("./../utilities/tellUserFileExists");

module.exports = function makeDirective(directiveName, force) {
  let path = `./app/directive/${directiveName}.ts`;
  tellUserFileExists(path, "directive", force).then(() => {
    try {
      fs.copySync(`${__dirname}/../stubs/directive.ts`, path);
      replaceTextInFile(path, "temp", camelCase(directiveName));
    } catch (err) {
      console.error(err);
    }
  });
};
