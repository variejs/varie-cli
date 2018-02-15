const fs = require("fs-extra");
const toPascalCase = require("to-pascal-case");
const replaceTextInFile = require("./../utilities/replaceTextInFile");
const tellUserFileExists = require("./../utilities/tellUserFileExists");

module.exports = function makeModel(modelName, force) {
  let path = `./app/models/${modelName}Model.ts`;
  tellUserFileExists(path, "model", force).then(valid => {
    if (valid) {
      try {
        fs.copySync(`${__dirname}/../stubs/model.ts`, path);
        replaceTextInFile(path, "temp", toPascalCase(modelName));
        console.info(`Model created: ${path}`);
      } catch (err) {
        console.error(err);
      }
    }
  });
};
