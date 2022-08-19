import "./loadEnvironment";
import express from "express";
import Debug from "debug";
import chalk from "chalk";
import cors from "cors";

const debug = Debug("users:index");

const app = express();
const port = process.env.PORT ?? 4000;

app.use(cors());

app.listen(port, () => {
  debug(chalk.green(`Server listening on port ${port}`));
});
