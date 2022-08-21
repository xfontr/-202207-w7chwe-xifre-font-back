import "../loadEnvironment";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import Payload from "../types/payload";

export const hashCreate = (password: string): Promise<string> => {
  const salt = 10;
  return bcrypt.hash(password, salt);
};

export const hashCompare = (
  dataToCompare: string,
  hash: string
): Promise<boolean> => bcrypt.compare(dataToCompare, hash);

export const createToken = (payload: Payload): string =>
  jwt.sign(payload, process.env.AUTH_SECRET || "qwerty");

export const verifyToken = (token: string): string | JwtPayload =>
  jwt.verify(token, process.env.AUTH_SECRET || "qwerty");
