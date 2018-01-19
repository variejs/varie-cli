const fs = require("fs-extra");

module.exports = function makeProvider(providerName) {
  try {
    fs.copySync(
      `${__dirname}/../stubs/provider.ts`,
      `./app/providers/${providerName}.ts`
    );
  } catch (err) {
    console.error(err);
  }
};
