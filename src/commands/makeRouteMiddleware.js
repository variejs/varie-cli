const fs = require("fs-extra");
const pascalCase = require("to-pascal-case");
const replaceTextInFile = require("./../utilities/replaceTextInFile");
const tellUserFileExists = require("./../utilities/tellUserFileExists");

module.exports = function makeRouteMiddleware(providerName, force) {
  providerName = pascalCase(providerName);
  let path = `./routes/middleware/${providerName}.ts`;
  tellUserFileExists(path, "provider", force).then(valid => {
    if (valid) {
      try {
        fs.copySync(`${process.env.varie_vendor_path}/stubs/routeMiddleware.ts`, path);
        replaceTextInFile(path, "temp", providerName);
        console.info(`Router Middleware created: ${path}`);
      } catch (err) {
        console.error(err);
      }
    }
  });
};
