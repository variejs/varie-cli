const fs = require("fs-extra");
const pascalCase = require("to-pascal-case");
const replaceTextInFile = require("./../utilities/replaceTextInFile");
const tellUserFileExists = require("./../utilities/tellUserFileExists");

module.exports = function makeAppMiddleware(middlewareName, force) {
  middlewareName = pascalCase(middlewareName);
  let path = `./app/middleware/${middlewareName}.ts`;
  tellUserFileExists(path, "middleware", force).then(valid => {
    if (valid) {
      try {
        fs.copySync(`${__dirname}/../stubs/appMiddleware.ts`, path);
        replaceTextInFile(path, "temp", middlewareName);
        console.info(`App Middleware created: ${path}`);
      } catch (err) {
        console.error(err);
      }
    }
  });
};
