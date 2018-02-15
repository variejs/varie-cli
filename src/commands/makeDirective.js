const fs = require("fs-extra");
const camelCase = require("camelcase");
const replaceTextInFile = require("./../utilities/replaceTextInFile");
const tellUserFileExists = require("./../utilities/tellUserFileExists");

module.exports = function makeDirective(directiveName, force) {
  let path = `./app/directives/${directiveName}.ts`;
  tellUserFileExists(path, "directives", force).then(valid => {
    if (valid) {
      try {
        fs.copySync(`${__dirname}/../stubs/directive.ts`, path);
        replaceTextInFile(path, "temp", camelCase(directiveName));
        console.info(`Directive created: ${path}`);
      } catch (err) {
        console.error(err);
      }
    }
  });
};
