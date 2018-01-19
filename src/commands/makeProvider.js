const fs = require("fs-extra");
const toPascalCase = require("to-pascal-case");
const replaceTextInFile = require("./../utilities/replaceTextInFile");
const tellUserFileExists = require("./../utilities/tellUserFileExists");

module.exports = function makeProvider(providerName, force) {
  let path = `./app/providers/${providerName}Provider.ts`;
  tellUserFileExists(path, "provider", force).then(() => {
    try {
      fs.copySync(`${__dirname}/../stubs/provider.ts`, path);
      replaceTextInFile(path, "temp", toPascalCase(providerName));
    } catch (err) {
      console.error(err);
    }
  });
};
