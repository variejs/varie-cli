const ora = require("ora");
const fs = require("fs-extra");
const chalk = require("chalk");
const exec = require("./../utilities/exec");
const downloadGitRepo = require("download-git-repo");
const loadNvm =
  'export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh" &&';

module.exports = function makeProject(projectName, branch, force = false) {
  let projectDirectory = `${process.cwd()}/${projectName}`;

  fs.pathExists(projectDirectory, (err, exists) => {
    let hasNvm = "";
    if (!exists || force) {
      const spinner = ora();
      spinner.start(`Creating ${projectName}`);

      let startDownload = () => {
        downloadGitRepo(
          `variejs/varie${typeof branch === "string" ? `#${branch}` : ""}`,
          projectDirectory,
          function(err) {
            if (err) {
              spinner.fail("Failed to download varie : " + err.message.trim());
            } else {
              exec(`cd ${projectDirectory} && cp .env.example .env`);

              spinner.succeed(`Created ${projectName}`);
              spinner.start("Running npm install.");

              exec(
                `cd ${projectDirectory} && ${loadNvm} nvm use && npm install`
              ).then(
                () => {
                  spinner.succeed(`NPM modules installed.`);
                  spinner.start("Building Project.");
                  exec(
                    `cd ${projectDirectory} && ${
                      hasNvm ? `${loadNvm} nvm use &&` : ""
                    } npm run dev`
                  ).then(
                    () => {
                      spinner.succeed("Project Built, and ready to develop!");
                    },
                    err => {
                      spinner.fail(err);
                    }
                  );
                },
                err => {
                  spinner.fail(err);
                }
              );
            }
          }
        );
      };

      exec(`${loadNvm} command -v nvm`)
        .then(result => {
          if (result.trim() === "nvm") {
            hasNvm = `${loadNvm}`;
          }
          startDownload();
        })
        .catch(function(e) {
          startDownload();
        });
    } else {
      console.log(
        chalk.red(
          "This folder already exists. You can use --force to overwrite"
        )
      );
    }
  });
};
