import "./loadEnvironment";
import Debug from "debug";
import chalk from "chalk";
import startServer from "./server/startServer";

const debug = Debug("users:index");

const port = +process.env.PORT ?? 4000;

(async () => {
  debug(chalk.bgCyan("Initiating server"));
  try {
    startServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
