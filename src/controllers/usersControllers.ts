import { NextFunction, Request, Response } from "express";
import Debug from "debug";
import chalk from "chalk";
import { User } from "../database/models/User";
import { LoginData, RegisterUser, IUser } from "../types/users";
import { hashCreate } from "../utils/auth";
import { CustomError } from "../utils/CustomError";

const debug = Debug("users:controllers/userControllers");

const customError = new CustomError(null, undefined, undefined);

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userToRegister: RegisterUser = req.body;

  let newUser;

  try {
    userToRegister.password = await hashCreate(userToRegister.password);

    newUser = await User.create(userToRegister);

    debug(chalk.green(`Registered user ${userToRegister.name}`));
  } catch (error) {
    customError.code = 400;
    customError.message = error.message;
    customError.privateMessage =
      "Error creating a user after hashing the password";

    next(customError);
    return;
  }

  res.status(200).json({ newUser });
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userToLogin: LoginData = req.body;
  let dbUser: IUser[];

  try {
    dbUser = await User.find({ name: userToLogin.name });

    if (dbUser.length === 0) {
      throw new Error();
    }
  } catch (error) {
    customError.code = 400;
    customError.message = error.message;
    customError.privateMessage = "User not found";
    next(customError);
  }

  const dbPassword = dbUser[0].password;
};
