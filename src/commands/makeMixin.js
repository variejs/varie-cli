const fs = require("fs-extra");

module.exports = function makeMixin(mixinName) {
  try {
    fs.copySync(
      `${__dirname}/../stubs/mixin.ts`,
      `./app/mixins/${mixinName}.ts`
    );
  } catch (err) {
    console.error(err);
  }
};
