import express from "express";
import { signUp, signIn, userData } from "../../controllers/usersControllers";

const usersRouter = express.Router();

usersRouter.post("/sign-up", signUp);
usersRouter.post("/sign-in", signIn);

usersRouter.get("/:id", userData);

export default usersRouter;
