const fs = require("fs-extra");

module.exports = function makeDirective(directiveName) {
  try {
    fs.copySync(
      `${__dirname}/../stubs/directive.ts`,
      `./app/directive/${directiveName}.ts`
    );
  } catch (err) {
    console.error(err);
  }
};
