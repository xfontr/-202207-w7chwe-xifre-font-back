import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/CustomError";
import generalError from "./generalError";

describe("Given a generalError function (middleware)", () => {
  describe("When called with a custom error, a req, res and next as arguments", () => {
    const status = 400;

    const req = {} as Partial<Request>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;

    const next = jest.fn() as NextFunction;

    const customError = new CustomError(status, "Error", "Error");

    const jsonResponse = { error: customError.message };

    test("Then it should call status with a code of 400", () => {
      generalError(customError, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should call the json method with an error as a response", () => {
      generalError(customError, req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(jsonResponse);
    });
  });

  describe("When no values as message and as code are provided", () => {
    const req = {} as Partial<Request>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;

    const next = jest.fn() as NextFunction;

    const customError = new CustomError(null, undefined, undefined);
    const defaultStatus = 500;
    const defaultMessage = "Something went wrong";
    const jsonResponse = { error: defaultMessage };

    test("Then it should send a default 500 error and a 'Something went wrong message'", () => {
      generalError(customError, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(defaultStatus);
    });

    test("Then it should send a 'Something went wrong message'", () => {
      generalError(customError, req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(jsonResponse);
    });
  });
});
