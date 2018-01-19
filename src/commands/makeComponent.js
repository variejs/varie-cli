const fs = require("fs-extra");

module.exports = function makeComponent(componentName) {
  try {
    fs.copySync(
      `${__dirname}/../stubs/component.vue`,
      `./app/components/${componentName}.vue`
    );
  } catch (err) {
    console.error(err);
  }
};
