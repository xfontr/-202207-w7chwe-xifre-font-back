import "./loadEnvironment";
import express from "express";
import Debug from "debug";
import chalk from "chalk";

const debug = Debug("users:index");

const app = express();
const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  debug(chalk.green(`Server listening on port ${port}`));
});
