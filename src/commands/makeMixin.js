const fs = require("fs-extra");
const tellUserFileExists = require("./../utilities/tellUserFileExists");

module.exports = function makeMixin(mixinName, force) {
  let path = `${process.env.varie_path}/app/mixins/${mixinName}.ts`;
  tellUserFileExists(path, "mixin", force).then(valid => {
    if (valid) {
      try {
        fs.copySync(`${process.env.varie_vendor_path}/stubs/mixin.ts`, path);
        console.info(`Mixin created: ${path}`);
      } catch (err) {
        console.error(err);
      }
    }
  });
};
