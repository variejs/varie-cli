const fs = require("fs-extra");

module.exports = function makeRouterMiddleware(middlewareName) {
  try {
    fs.copySync(
      `${__dirname}/../stubs/route-middleware.ts`,
      `./routes/middleware/${middlewareName}.ts`
    );
  } catch (err) {
    console.error(err);
  }
};
