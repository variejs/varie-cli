const fs = require("fs-extra");
const toPascalCase = require("to-pascal-case");
const replaceTextInFile = require("./../utilities/replaceTextInFile");
const tellUserFolderExists = require("./../utilities/tellUserFolderExists");

module.exports = function makeStore(storePath, force) {
  let splitStore = storePath.split("/");
  let storeName = splitStore.pop();
  let fullPath = `./store/${storePath.split("/").join("/modules/")}`;

  tellUserFolderExists(fullPath, "store", force).then(valid => {
    if (valid) {
      try {
        fs.copySync(`${__dirname}/../stubs/store`, fullPath);

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
        replaceTextInFile(
          `${fullPath}/index.ts`,
          "temp",
          toPascalCase(storeName)
        );
        replaceTextInFile(
          `${fullPath}/mutations.ts`,
          "temp",
          toPascalCase(storeName)
        );
        replaceTextInFile(
          `${fullPath}/state.ts`,
          "temp",
          toPascalCase(storeName)
        );
        replaceTextInFile(
          `${fullPath}/stateInterface.ts`,
          "temp",
          toPascalCase(storeName)
        );
        console.info(`Store created: ${fullPath}`);
      } catch (err) {
        console.error(err);
      }
    }
  });
};
