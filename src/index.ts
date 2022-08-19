import "./loadEnvironment";
import express from "express";
import Debug from "debug";
import chalk from "chalk";

const debug = Debug("users:index");

const app = express();
