const fs = require("fs-extra");
const snakeCase = require("snake-case");
const tellUserFileExists = require("./../utilities/tellUserFileExists");

module.exports = function makeRule(ruleName, force) {
  ruleName = snakeCase(ruleName);

  let path = `./app/rules/${ruleName}.ts`;
  tellUserFileExists(path, "rule", force).then(() => {
    try {
      fs.copySync(`${__dirname}/../stubs/rule.ts`, path);
    } catch (err) {
      console.error(err);
    }
  });
};
