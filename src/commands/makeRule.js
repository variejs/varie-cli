const fs = require("fs-extra");
const snakeCase = require("snake-case");
const tellUserFileExists = require("./../utilities/tellUserFileExists");

module.exports = function makeRule(ruleName, force) {
  ruleName = snakeCase(ruleName);

  let path = `${process.env.varie_path}/app/rules/${ruleName}.ts`;
  tellUserFileExists(path, "rule", force).then((valid) => {
    if (valid) {
      try {
        fs.copySync(`${process.env.varie_vendor_path}/stubs/rule.ts`, path);
        console.info(`Rule created: ${path}`);
      } catch (err) {
        console.error(err);
      }
    }
  });
};
