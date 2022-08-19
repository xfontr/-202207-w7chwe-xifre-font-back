import "./loadEnvironment";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import usersRouter from "./server/routers/usersRouter";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* ROUTES */
app.use(usersRouter);

export default app;
