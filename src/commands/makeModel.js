const fs = require("fs-extra");

module.exports = function makeModel(modelName) {
  try {
    fs.copySync(
      `${__dirname}/../stubs/model.ts`,
      `./app/models/${modelName}.ts`
    );
  } catch (err) {
    console.error(err);
  }
};
