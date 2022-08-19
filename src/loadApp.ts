import "./loadEnvironment";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import usersRouter from "./server/routers/usersRouter";
import generalError from "./middlewares/generalError";

const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* ROUTES */
app.use(usersRouter);

app.use(generalError);

export default app;
