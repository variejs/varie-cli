const fs = require("fs-extra");

module.exports = function makeFilter(filterName) {
  try {
    fs.copySync(
      `${__dirname}/../stubs/filter.ts`,
      `./app/filters/${filterName}.ts`
    );
  } catch (err) {
    console.error(err);
  }
};
