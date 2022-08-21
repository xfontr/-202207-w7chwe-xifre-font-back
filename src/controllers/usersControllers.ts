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

const isContact = (
  option: "add-friend" | "add-enemy",
  friends: [string],
  enemies: [string],
  friendId: string
): boolean => {
  let matches;
  switch (option) {
    case "add-friend":
      matches = friends.filter((friend: string) => friend === friendId);

      if (matches.length === 0) {
        return true;
      }
      break;

    case "add-enemy":
      matches = enemies.filter((enemy: string) => enemy === friendId);

      if (matches.length === 0) {
        return true;
      }
      break;

    default:
      return false;
  }
  return false;
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

  const userWithId: IUser = await User.findById(newUser.id);
  const token = await prepareToken(userWithId);
  res.status(200).json({ newUser, token });
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
    customError.message = "Invalid username or password";
    customError.privateMessage = "Password not correct";
    next(customError);
    return;
  }

  res.status(200).json(prepareToken(dbUser[0]));
};

export const userData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  let dbUser: IUser;

  try {
    dbUser = await User.findById(id);

    if (!dbUser) {
      throw new Error();
    }
  } catch (error) {
    customError.code = 400;
    customError.message = error.message;
    customError.privateMessage = "User not found";
    next(customError);
    return;
  }

  res.status(200).json({ user: dbUser });
};

export const allUsersData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let dbUsers: IUser[];

  try {
    dbUsers = await User.find({});

    if (!dbUsers.length) {
      throw new Error();
    }
  } catch (error) {
    customError.code = 400;
    customError.message = error.message;
    customError.privateMessage = "No users found";
    next(customError);
    return;
  }

  res.status(200).json({ users: dbUsers });
};

export const addContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { option, id, friendId } = req.params;
  const options = option as "add-friend" | "add-enemy";

  let userRequesting;
  let userRequestingFriends: [string];
  let userRequestingEnemies: [string];

  try {
    userRequesting = await User.findById(id);
    const leanUserRequesting = await User.findById(id).lean();
    userRequestingFriends = leanUserRequesting.contacts.friends as [string];

    userRequestingEnemies = leanUserRequesting.contacts.enemies as [string];

    await User.findById(friendId);
  } catch (error) {
    customError.code = 400;
    customError.message = "Unable to add contact";
    customError.privateMessage = "At least one of the users was not found";
    next(customError);
    return;
  }

  const isAlreadyContact = isContact(
    options,
    userRequestingFriends,
    userRequestingEnemies,
    friendId
  );

  if (!isAlreadyContact) {
    customError.code = 400;
    customError.message = "Unable to add contact";
    customError.privateMessage = "ID already in user contact list";
    next(customError);
    return;
  }
  const list = options === "add-friend" ? "friends" : "enemies";

  userRequesting.contacts[list] = [...userRequesting.contacts[list], friendId];

  await userRequesting.save();

  res.status(200).json({ addedToContacts: friendId });
};
