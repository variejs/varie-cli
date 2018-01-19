const fs = require("fs");

function replaceTextInfile(filePath, stringToBeReplaced, replacement) {
  fs.readFile(filePath, "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }

    let result = data.replace(new RegExp(stringToBeReplaced, "g"), replacement);

    fs.writeFile(filePath, result, "utf8", function(err) {
      if (err) {
        return console.log(err);
      }
    });
  });
}

module.exports = replaceTextInfile;
