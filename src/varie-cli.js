const path = require("path");
const inquirer = require("inquirer");
const program = require("commander");
const commands = require("./commands");
const Matcher = require("did-you-mean");
const nodeModulesPath = require("./utilities/findNodeModules")();

let packageJson = null;
try {
  packageJson = require(`${nodeModulesPath}/../package.json`);
} catch (error) {
  // do nothing
}

process.env.varie_path = process.cwd();
process.env.varie_vendor_path = `${nodeModulesPath}/varie`;
process.env.node_modules_path = nodeModulesPath;

if (packageJson && packageJson.variePath) {
  process.env.varie_path = path.join(
    `${nodeModulesPath}/../`,
    packageJson.variePath,
  );
}

program
  .option("--force", "Forces a command")
  .version(require("../package").version)
  .usage("<command> [options]");

program
  .command("new")
  .description("Creates a new varie instance")
  .option("--dev", 'Installs the latest "development" release')
  .action(function(projectName, branch = "master") {
    commands.newProject(projectName, branch, program.force);
  });

program
  .command("make:component")
  .description("Creates a Vue component in the component directory")
  .action(function(componentName) {
    commands.makeComponent(componentName, program.force);
  });

program
  .command("make:directive")
  .description("Creates a Vue directive in the directive directory")
  .action(function(directiveName) {
    commands.makeDirective(directiveName, program.force);
  });

program
  .command("make:filter")
  .description("Creates a Vue filter in the filters directory")
  .action(function(filterName) {
    commands.makeFilter(filterName, program.force);
  });

program
  .command("make:mixin")
  .description("Creates a Vue mixin in the mixins directory")
  .action(function(mixinName) {
    commands.makeMixin(mixinName, program.force);
  });

program
  .command("make:model")
  .description("Creates a model in the model directory")
  .action(function(modelName) {
    commands.makeModel(modelName, program.force);
  });

program
  .command("make:provider")
  .description("Creates a new provider in the providers directory")
  .action(function(providerName) {
    commands.makeProvider(providerName, program.force);
  });

program
  .command("make:store")
  .description(
    "Creates a Vuex store / submodule in the store directory based on the path provided",
  )
  .action(function(storeName) {
    commands.makeStore(storeName, program.force);
  });

program
  .command("make:service")
  .description(
    "Creates a Service in the app/services directory based on the path provided",
  )
  .action(function(storeName) {
    commands.makeService(storeName, program.force);
  });

program
  .command("make:app-middleware")
  .description("Creates a new app middleware")
  .action(function(appMiddlewareName) {
    commands.makeAppMiddleware(appMiddlewareName, program.force);
  });

program
  .command("make:route-middleware")
  .description("Creates a new route middleware")
  .action(function(routeMiddlewareName) {
    commands.makeRouteMiddleware(routeMiddlewareName, program.force);
  });

program
  .command("make:rule")
  .description("Creates a rule in the rule directory")
  .action(function(ruleName) {
    commands.makeRule(ruleName, program.force);
  });

program
  .command("make:validator")
  .description("Creates a validator in the validators directory")
  .action(function(validatorName) {
    commands.makeValidator(validatorName, program.force);
  });

function isPublishable(package) {
  let packageJson = require(`${
    process.env.node_modules_path
  }/${package}/package.json`);
  return packageJson && packageJson.variePublishable && packageJson.name;
}

program
  .command("publish")
  .description("Publishes plugins configs and assets")
  .action(function(package) {
    if (typeof package !== "string") {
      let publishable = [];

      for (let package in packageJson.dependencies) {
        if (isPublishable(package)) {
          publishable.push(package);
        }
      }

      for (let package in packageJson.devDependencies) {
        if (isPublishable(package)) {
          publishable.push(package);
        }
      }
      inquirer
        .prompt([
          {
            name: "publish",
            message:
              "Which plugins do you wish to publish its assets (this will overwrite any files)",
            type: "checkbox",
            choices: publishable,
          },
        ])
        .then((answers) => {
          commands.publish(answers.publish);
        });
    } else {
      try {
        if (isPublishable(package)) {
          return commands.publish([package]);
        }
        console.error("This package is not publishable");
      } catch (error) {
        console.error(`We could not find ${package}`);
      }
    }
  });

program.command("*").action(function(command) {
  let matcher = new Matcher();
  matcher.setThreshold(4);
  if (command.includes("make")) {
    matcher.add(
      "make:component",
      "make:directive",
      "make:filter",
      "make:mixin",
      "make:model",
      "make:provider",
      "make:store",
      "make:app-middleware",
      "make:route-middleware",
      "make:rule",
      "make:validator",
      "publish",
      "new",
    );
  }

  let matches = matcher.list(command);
  if (matches.length) {
    console.error(`Did you mean one of these?`);
    console.error("");
    matches.forEach((match) => {
      console.error(match.value);
    });
    console.error("");
    return;
  }
});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
