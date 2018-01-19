const program = require("commander");
const commands = require("./commands");

program.version(require("../package").version).usage("<command> [options]");

program
  .command("new")
  .option("--dev", 'Installs the latest "development" release')
  .option("--force", "Forces install even if the directory already exists")
  .description("run remote setup commands")
  .action(function(projectName, branch = "master") {
    commands.newProject(projectName, branch, program.force);
  });

program
  .command("make:component")
  .description("makes a Vue directive in the component directory")
  .action(function(componentName) {
    commands.makeComponent(componentName);
  });

program
  .command("make:directive")
  .description("Makes a Vue directive in the directive directory")
  .action(function(directiveName) {
    commands.makeDirective(directiveName);
  });

program
  .command("make:filter")
  .description("Makes a Vue filter in the filters directory")
  .action(function(filterName) {
    commands.makeFilter(filterName);
  });

program
  .command("make:mixin")
  .description("Makes a Vue mixin in the mixins directory")
  .action(function(mixinName) {
    commands.makeMixin(mixinName);
  });

program
  .command("make:model")
  .description("Makes a model in the model directory")
  .action(function(modelName) {
    commands.makeModel(modelName);
  });

program
  .command("make:provider")
  .description("Creates a new provider in the providers directory")
  .action(function(providerName) {
    commands.makeProvider(providerName);
  });

program
  .command("make:store")
  .description(
    "Crates a Vuex store / submodule in the store directory based on the path provided"
  )
  .action(function(storeName) {
    commands.makeStore(storeName);
  });

program
  .command("make:router-middleware")
  .description("Creates a new route middleware")
  .action(function(routeMiddlewareName) {
    commands.makeRouteMiddleware(routeMiddlewareName);
  });

program.parse(process.argv);
