import { NextFunction, Response } from "express";
import { CustomError } from "../utils/CustomError";
import authentication, { CustomRequest } from "./authentication";

let mockVerificationResult = {};

jest.mock("../utils/auth", () => ({
  ...jest.requireActual("../utils/auth"),
  verifyToken: () => mockVerificationResult,
}));

describe("Given a authentication function", () => {
  describe("When called with req, res and next as arguments", () => {
    test("Then it should call the next function", () => {
      const req = {
        get: jest.fn().mockReturnValue("Bearer #"),
        paylad: 1,
      } as Partial<CustomRequest>;

      const res = {
        status: jest.fn(),
        json: jest.fn().mockReturnThis(),
      } as Partial<Response>;

      const next = jest.fn() as NextFunction;
      const error = new CustomError(500, "Bad request", "Authentication Error");

      authentication(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalled();
      expect(next).not.toHaveBeenCalledWith(error);
    });

    test("If the token doesn't start with bearer, it should call next with an error", () => {
      const req = {
        get: jest.fn().mockReturnValue("Bearer #"),
        paylad: 1,
      } as Partial<CustomRequest>;

      const res = {
        status: jest.fn(),
        json: jest.fn().mockReturnThis(),
      } as Partial<Response>;

      const next = jest.fn() as NextFunction;
      const error = new CustomError(500, "Bad request", "Authentication Error");

      req.get = jest.fn().mockReturnValue("#");
      authentication(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });

    test("If the token is empty, it should call next with an error", () => {
      const req = {
        get: jest.fn().mockReturnValue(""),
        paylad: 1,
      } as Partial<CustomRequest>;

      const res = {
        status: jest.fn(),
        json: jest.fn().mockReturnThis(),
      } as Partial<Response>;

      const next = jest.fn() as NextFunction;
      const error = new CustomError(500, "Bad request", "Authentication Error");

      authentication(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a authentication function", () => {
  test("If the verification result is a string, it should call next with an error", async () => {
    const req = {
      get: jest.fn().mockReturnValue("Bearer #"),
      paylad: 1,
    } as Partial<CustomRequest>;

    const res = {
      status: jest.fn(),
      json: jest.fn().mockReturnThis(),
    } as Partial<Response>;

    const next = jest.fn() as NextFunction;

    const customError = new CustomError(
      500,
      "Bad request",
      "Authentication Error"
    );

    mockVerificationResult = "Error";
    authentication(req as CustomRequest, res as Response, next as NextFunction);

    customError.message = "Authentication Error";
    customError.privateMessage = "Invalid token";
    customError.code = 500;

    expect(next).toHaveBeenCalledWith(customError);
  });
});
