const fs = require("fs-extra");
const tellUserFileExists = require("./../utilities/tellUserFileExists");

module.exports = function makeMixin(mixinName, force) {
  let path = `./app/mixins/${mixinName}.ts`;
  tellUserFileExists(path, "mixin", force).then(valid => {
    if (valid) {
      try {
        fs.copySync(`${__dirname}/../stubs/mixin.ts`, path);
        console.info(`Mixin created: ${path}`);
      } catch (err) {
        console.error(err);
      }
    }
  });
};
