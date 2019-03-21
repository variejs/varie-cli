const fs = require("fs-extra");
const paramCase = require("param-case");
const toPascalCase = require("to-pascal-case");
const replaceTextInFile = require("./../utilities/replaceTextInFile");
const tellUserFolderExists = require("./../utilities/tellUserFolderExists");

module.exports = function makeStore(storePath, force) {
  let fullPath = `${process.env.varie_path}/store/${storePath
    .split("/")
    .map((part) => {
      return paramCase(part);
    })
    .join("/modules/")}`;

  tellUserFolderExists(fullPath, "store", force).then((valid) => {
    if (valid) {
      try {
        let storeName = toPascalCase(storePath);

        fs.removeSync(fullPath);
        fs.copySync(`${process.env.varie_vendor_path}/stubs/store`, fullPath);

        fs.moveSync(`${fullPath}/index.ts`, `${fullPath}/${storeName}Store.ts`);

        replaceTextInFile(`${fullPath}/actions.ts`, "temp", storeName);
        replaceTextInFile(`${fullPath}/getters.ts`, "temp", storeName);

        replaceTextInFile(
          `${fullPath}/${storeName}Store.ts`,
          "store_name",
          `${paramCase(storePath.split("/").pop())}`,
        );

        replaceTextInFile(
          `${fullPath}/${storeName}Store.ts`,
          "temp",
          `${storeName}Store`,
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
