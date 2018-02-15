const fs = require("fs-extra");
const snakeCase = require("snake-case");
const tellUserFileExists = require("./../utilities/tellUserFileExists");

module.exports = function makeRule(ruleName, force) {
  ruleName = snakeCase(ruleName);

  let path = `./app/rules/${ruleName}.ts`;
  tellUserFileExists(path, "rule", force).then((valid) => {
    if(valid) {
      try {
        fs.copySync(`${__dirname}/../stubs/rule.ts`, path);
        console.info(`Rule created: ${path}`);
      } catch (err) {
        console.error(err);
      }
    }
  });
};
