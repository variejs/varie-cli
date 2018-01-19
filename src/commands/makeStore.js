const fs = require("fs-extra");
const toPascalCase = require("to-pascal-case");
const replaceTextInFile = require("./../utilities/replaceTextInFile");
const tellUserFolderExists = require("./../utilities/tellUserFolderExists");

module.exports = function makeStore(storePath, force) {
  let splitStore = storePath.split("/");
  let storeName = splitStore.pop();
  let fullPath = `./app/store/${storePath.split("/").join("/modules/")}`;

  tellUserFolderExists(fullPath, "store", force).then(() => {
    try {
      fs.copySync(`${__dirname}/../stubs/store`, fullPath);
    } catch (err) {
      console.error(err);
    }

    replaceTextInFile(
      `${fullPath}/actions.ts`,
      "temp",
      toPascalCase(storeName)
    );
    replaceTextInFile(
      `${fullPath}/getters.ts`,
      "temp",
      toPascalCase(storeName)
    );
    replaceTextInFile(`${fullPath}/index.ts`, "temp", toPascalCase(storeName));
    replaceTextInFile(
      `${fullPath}/mutations.ts`,
      "temp",
      toPascalCase(storeName)
    );
    replaceTextInFile(`${fullPath}/state.ts`, "temp", toPascalCase(storeName));
    replaceTextInFile(
      `${fullPath}/stateInterface.ts`,
      "temp",
      toPascalCase(storeName)
    );
  });
};
