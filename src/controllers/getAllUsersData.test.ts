import { NextFunction, Request, Response } from "express";
import { User } from "../database/models/User";
import mockUser from "../mocks/mockUser";
import { allUsersData } from "./usersControllers";

describe("Given a allUsersData function (controller)", () => {
  const status = 200;

  const req = {} as Partial<Request>;

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  const next = jest.fn() as NextFunction;
  User.find = jest.fn().mockReturnValue([mockUser, mockUser]);

  describe("When called with a request, a response and a next function as arguments", () => {
    test("It should call status with a code of 200", async () => {
      await allUsersData(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("It should respond with an array of users as a body", async () => {
      await allUsersData(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalled();
    });

    test("It should respond with an error if something goes wrong when finding users", async () => {
      User.find = jest.fn().mockRejectedValue(new Error());
      await allUsersData(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(Error());
    });
  });
});
