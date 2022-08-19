import { NextFunction, Request, Response } from "express";

const signUp = (req: Request, res: Response, next: NextFunction) => {
  const userToRegister = req.body;
};

export default signUp;
