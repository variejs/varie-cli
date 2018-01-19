const fs = require("fs-extra");
const tellUserFileExists = require("./../utilities/tellUserFileExists");

module.exports = function makeComponent(componentName, force) {
  let path = `./app/components/${componentName}.vue`;
  tellUserFileExists(path, "component", force).then(() => {
    try {
      fs.copySync(`${__dirname}/../stubs/component.vue`, path);
    } catch (err) {
      console.error(err);
    }
  });
};
