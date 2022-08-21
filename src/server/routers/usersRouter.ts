import express from "express";
import {
  signUp,
  signIn,
  userData,
  allUsersData,
  addContact,
} from "../../controllers/usersControllers";
import authentication from "../../middlewares/authentication";

const usersRouter = express.Router();

usersRouter.post("/sign-up", signUp);
usersRouter.post("/sign-in", signIn);

usersRouter.get("/all", authentication, allUsersData);
usersRouter.get("/:id", authentication, userData);

usersRouter.patch("/:option/:id/:friendId", addContact);

export default usersRouter;
