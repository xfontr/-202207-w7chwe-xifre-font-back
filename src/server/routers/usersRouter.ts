import express from "express";
import { signUp, signIn } from "../../controllers/usersControllers";

const usersRouter = express.Router();

usersRouter.post("/sign-up", signUp);
usersRouter.post("/sign-in", signIn);

export default usersRouter;
