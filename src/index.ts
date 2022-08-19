import "./loadEnvironment";
import Debug from "debug";
import chalk from "chalk";
import startServer from "./server/startServer";
import connectDB from "./database";

const debug = Debug("users:index");

const port = +process.env.PORT ?? 4000;
const database = process.env.MONGO_DB;

(async () => {
  debug(chalk.bgCyan("Initiating server"));
  try {
    await connectDB(database);
    await startServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
