import { NextFunction, Request, Response } from "express";
import Debug from "debug";
import chalk from "chalk";
import { User } from "../database/models/User";
import { LoginData, RegisterUser, IUser } from "../types/users";
import { createToken, hashCompare, hashCreate } from "../utils/auth";
import { CustomError } from "../utils/CustomError";
import Payload from "../types/payload";

const debug = Debug("users:controllers/userControllers");

const customError = new CustomError(null, undefined, undefined);

const prepareToken = (user: IUser) => {
  const payload: Payload = {
    id: user.id,
    name: user.name,
  };

  const token: string = createToken(payload);

  return {
    user: {
      token,
    },
  };
};

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
    return;
  }

  const dbPassword = dbUser[0].password;
  let isPasswordCorrect: boolean;

  try {
    isPasswordCorrect = await hashCompare(userToLogin.password, dbPassword);

    if (!isPasswordCorrect) {
      throw new Error();
    }
  } catch (error) {
    customError.code = 400;
    customError.message = error.message;
    customError.privateMessage = "Password not correct";
    next(customError);
  }

  res.status(200).json(prepareToken(dbUser[0]));
};
