const program = require("commander");
const commands = require("./commands");

program
  // TODO - these options should exist on a command
  .option("--dev", 'Installs the latest "development" release')
  .option("--force", "Forces install even if the directory already exists")
  .version(require("../package").version)
  .usage("<command> [options]");

program
  .command("new")
  .description("run remote setup commands")
  .action(function(projectName, branch = "master") {
    commands.newProject(projectName, branch, program.force);
  });

program
  .command("make:component")
  .description("makes a Vue directive in the component directory")
  .action(function(componentName) {
    commands.makeComponent(componentName, program.force);
  });

program
  .command("make:directive")
  .description("Makes a Vue directive in the directive directory")
  .action(function(directiveName) {
    commands.makeDirective(directiveName, program.force);
  });

program
  .command("make:filter")
  .description("Makes a Vue filter in the filters directory")
  .action(function(filterName) {
    commands.makeFilter(filterName, program.force);
  });

program
  .command("make:mixin")
  .description("Makes a Vue mixin in the mixins directory")
  .action(function(mixinName) {
    commands.makeMixin(mixinName, program.force);
  });

program
  .command("make:model")
  .description("Makes a model in the model directory")
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
    "Crates a Vuex store / submodule in the store directory based on the path provided"
  )
  .action(function(storeName) {
    commands.makeStore(storeName, program.force);
  });

program
  .command("make:route-middleware")
  .description("Creates a new route middleware")
  .action(function(routeMiddlewareName) {
    commands.makeRouteMiddleware(routeMiddlewareName, program.force);
  });

program
	.command("make:rule")
	.description(
		"Crates a rule in the rule directory"
	)
	.action(function(ruleName) {
		commands.makeRule(ruleName, program.force);
	});

program.parse(process.argv);
