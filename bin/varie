#!/usr/bin/env node

const promisify = require("util.promisify");
const fs = require("fs-extra");
const ora = require("ora");
const chalk = require("chalk");
const program = require("commander");
const downloadGitRepo = require("download-git-repo");
const exec = promisify(require("child_process").exec);

program
  .version(require("../package").version)
  .usage("<command> [options]")
  .option("--dev", 'Installs the latest "development" release')
  .option("--force", "Forces install even if the directory already exists");

program
  .command("help")
  .description("display verbose help")
  .action(function() {
    help();
  });

program.on("--help", () => {
  help();
});

program
  .command("new")
  .description("run remote setup commands")
  .action(function(projectName, branch = "master") {
    let projectDirectory = `${process.cwd()}/${projectName}`;

    fs.pathExists(projectDirectory, (err, exists) => {
      if (!exists || program.force) {
        if (program.dev) {
          console.info("we should install dev");
        }

        const spinner = ora();
        spinner.start(`Creating ${projectName}`);

        downloadGitRepo(
          `variejs/varie${typeof branch === "string" ? `#${branch}` : ""}`,
          projectDirectory,
          function(err) {
            if (err) {
              spinner.fail("Failed to download varie : " + err.message.trim());
            } else {
              spinner.succeed(`Created ${projectName}`);
              spinner.start("Running npm install.");
              exec(`cd ${projectDirectory} && npm install`).then(
                () => {
                  spinner.succeed(`NPM modules installed.`);
                  spinner.start("Building Project.");
                  exec(`cd ${projectDirectory} && npm run dev`).then(
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
      } else {
        console.log(
          chalk.red(
            "This folder already exists. You can use --force to overwrite"
          )
        );
      }
    });
  });

program.parse(process.argv);

function help() {
  console.log("  Example:");
  console.log();
  console.log(
    chalk.gray("    # create a new project with an official template")
  );
  console.log("    $ varie new my-project");
  console.log();
}
