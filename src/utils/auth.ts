import "../loadEnvironment";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Payload from "../types/payload";

export const hashCreate = (password: string): Promise<string> => {
  const salt = 10;
  return bcrypt.hash(password, salt);
};

export const hashCompare = (
  dataToCompare: string,
  hash: string
): Promise<boolean> => bcrypt.compare(dataToCompare, hash);

export const createToken = (payload: Payload): string => {
  console.log(process.env.SECRET);
  console.log(process.env.MONGO_DB);
  return jwt.sign(payload, process.env.SECRET);
};
