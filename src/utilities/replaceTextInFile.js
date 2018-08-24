const fs = require("fs");

function replaceTextInfile(filePath, stringToBeReplaced, replacement) {
  let data = fs.readFileSync(filePath, "utf8");

  let result = data.replace(new RegExp(stringToBeReplaced, "g"), replacement);

  fs.writeFileSync(filePath, result, "utf8", function(err) {
    if (err) {
      return console.log(err);
    }
  });
}

module.exports = replaceTextInfile;
