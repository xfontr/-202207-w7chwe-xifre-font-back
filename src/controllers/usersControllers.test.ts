import { NextFunction, Request, Response } from "express";
import { User } from "../database/models/User";
import mockUser from "../mocks/mockUser";
import { signUp } from "./usersControllers";

jest.mock("../utils/auth", () => ({
  ...jest.requireActual("../utils/auth"),
  hashCreate: () => jest.fn().mockReturnValue("#"),
}));

const status = 200;

const req = {
  body: mockUser,
} as Partial<Request>;

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as Partial<Response>;

const next = jest.fn() as NextFunction;

User.create = jest.fn().mockReturnValue(mockUser);

describe("Given a signUp function (controller)", () => {
  describe("When called with a request, a response and a next function as arguments", () => {
    test("It should call status with a code of 200", async () => {
      await signUp(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("It should respond with a new user as a body", async () => {
      await signUp(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalled();
    });
  });
});

describe("Given a signIn function (controller)", () => {
  describe("Wehn called with a request, a response and a next function as arguments", () => {
    test("It should call status with a code of 200", () => {});
  });
});
