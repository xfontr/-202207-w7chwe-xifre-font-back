import { NextFunction, Request, Response } from "express";
import { User } from "../database/models/User";
import mockUser from "../mocks/mockUser";
import { signIn, signUp, userData } from "./usersControllers";

const mockHashCompare = jest.fn().mockReturnValue(true);

jest.mock("../utils/auth", () => ({
  ...jest.requireActual("../utils/auth"),
  hashCreate: () => jest.fn().mockReturnValue("#"),
  hashCompare: () => mockHashCompare,
  createToken: () => jest.fn().mockReturnValue("#"),
}));

describe("Given a signUp function (controller)", () => {
  const status = 200;

  const req = {
    body: mockUser,
  } as Partial<Request>;

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  const next = jest.fn() as NextFunction;

  User.find = jest.fn().mockReturnValue([mockUser]);
  User.create = jest.fn().mockReturnValue(mockUser);

  describe("When called with a request, a response and a next function as arguments", () => {
    test("It should call status with a code of 200", async () => {
      await signUp(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("It should respond with a new user as a body", async () => {
      await signUp(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalled();
    });

    test("It should respond with an error if something goes wrong when hashing the password or creating", async () => {
      User.create = jest.fn().mockRejectedValue(new Error());
      await signUp(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a signIn function (controller)", () => {
  const status = 200;

  const req = {
    body: mockUser,
  } as Partial<Request>;

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  const nextIn = jest.fn() as NextFunction;
  User.find = jest.fn().mockReturnValue([mockUser]);

  describe("When called with a request, a response and a next function as arguments", () => {
    test("It should call status with a code of 200", async () => {
      await signIn(req as Request, res as Response, nextIn);

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("It should respond with a new user as a body", async () => {
      await signIn(req as Request, res as Response, nextIn);

      expect(res.json).toHaveBeenCalled();
    });

    test("It should respond with an error if something goes wrong when finding users", async () => {
      User.find = jest.fn().mockRejectedValue(new Error());
      await signIn(req as Request, res as Response, nextIn);

      expect(nextIn).toHaveBeenCalledWith(Error());
    });
  });
});

describe("Given a userData function (controller)", () => {
  const status = 200;

  const req = {
    params: { id: "" },
  } as Partial<Request>;

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  const next = jest.fn() as NextFunction;
  User.findById = jest.fn().mockReturnValue(mockUser);

  describe("When called with a request, a response and a next function as arguments", () => {
    test("It should call status with a code of 200", async () => {
      await userData(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("It should respond with a user as a body", async () => {
      await userData(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalled();
    });

    test("It should respond with an error if something goes wrong when finding users", async () => {
      User.findById = jest.fn().mockRejectedValue(new Error());
      await userData(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(Error());
    });
  });
});
