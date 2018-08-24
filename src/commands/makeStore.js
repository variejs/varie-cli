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
        storeName = toPascalCase(storeName);
        fs.removeSync(fullPath);
        fs.copySync(`${__dirname}/../stubs/store`, fullPath);

        fs.moveSync(`${fullPath}/index.ts`, `${fullPath}/${storeName}Store.ts`);

        replaceTextInFile(`${fullPath}/actions.ts`, "temp", storeName);
        replaceTextInFile(`${fullPath}/getters.ts`, "temp", storeName);

        replaceTextInFile(
          `${fullPath}/${storeName}Store.ts`,
          "store_name",
          `${storeName.toLowerCase()}`
        );

        replaceTextInFile(
          `${fullPath}/${storeName}Store.ts`,
          "temp",
          `${storeName}Store`
        );

        replaceTextInFile(`${fullPath}/mutations.ts`, "temp", storeName);
        replaceTextInFile(`${fullPath}/state.ts`, "temp", storeName);
        replaceTextInFile(`${fullPath}/stateInterface.ts`, "temp", storeName);
        console.info(`Store created: ${fullPath}`);
      } catch (err) {
        console.error(err);
      }
    }
  });
};
