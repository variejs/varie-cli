const fs = require("fs-extra");
const toPascalCase = require("to-pascal-case");
const replaceTextInFile = require("./../utilities/replaceTextInFile");
const tellUserFileExists = require("./../utilities/tellUserFileExists");

module.exports = function makeValidator(modelName, force) {
  let path = `${process.env.varie_path}/app/service/${modelName}Service.ts`;
  tellUserFileExists(path, "service", force).then((valid) => {
    if (valid) {
      try {
        fs.copySync(`${process.env.varie_vendor_path}/stubs/service.ts`, path);
        replaceTextInFile(path, "temp", `${toPascalCase(modelName)}Service`);
        console.info(`Service created: ${path}`);
      } catch (err) {
        console.error(err);
      }
    }
  });
};
