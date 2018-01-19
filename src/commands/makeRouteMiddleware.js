const fs = require("fs-extra");
const tellUserFileExists = require("./../utilities/tellUserFileExists");

module.exports = function makeRouteMiddleware(providerName, force) {
  let path = `./routes/middleware/${providerName}.ts`;
  tellUserFileExists(path, "provider", force).then(() => {
    try {
      fs.copySync(`${__dirname}/../stubs/routeMiddleware.ts`, path);
    } catch (err) {
      console.error(err);
    }
  });
};
