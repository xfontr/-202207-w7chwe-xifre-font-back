import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { CustomError } from "../utils/CustomError";

export interface CustomRequest extends Request {
  payload: JwtPayload;
}

const customError = new CustomError(null, undefined, undefined);

const authentication = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const dataAuthentication = req.get("Authorization");

  if (!dataAuthentication || !dataAuthentication.startsWith("Bearer")) {
    customError.message = "Bad request";
    customError.privateMessage = "Authentication Error";
    customError.code = 500;
    next(error);
    return;
  }

  const token = dataAuthentication.slice(7);

  const tokenData = verifyToken(token);

  if (typeof tokenData === "string") {
    customError.message = "Authentication Error";
    customError.privateMessage = "Invalid token";
    customError.code = 500;
    next(error);
    return;
  }

  req.payload = tokenData;
  next();
};
export default authentication;
