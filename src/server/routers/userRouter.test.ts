import request from "supertest";
import app from "..";
import { User } from "../../database/models/User";
import mockUser from "../../mocks/mockUser";

jest.mock("../../utils/auth", () => ({
  ...jest.requireActual("../../utils/auth"),
  hashCreate: () => jest.fn().mockReturnValue("#"),
  hashCompare: () => jest.fn().mockReturnValue("#"),
  createToken: () => jest.fn().mockReturnValue("#"),
}));

describe("Given a /users/sign-in route", () => {
  describe("When requested with POST method", () => {
    test("Then it should respond with a status of 200", async () => {
      User.find = jest.fn().mockReturnValue([mockUser]);

      const res = await request(app).post("/users/sign-in").send({
        name: "aaa",
        password: "aaa",
      });

      expect(res.statusCode).toBe(200);
    });

    test("It should respond with a status of 400 if the database delivers no users", async () => {
      User.find = jest.fn().mockReturnValue([]);

      const res = await request(app).post("/users/sign-in").send({
        name: "aaa",
        password: "aaa",
      });

      expect(res.statusCode).toBe(400);
    });
  });
});

describe("Given a /users/sign-up route", () => {
  describe("When requested with POST method", () => {
    test("Then it should respond with a status of 200", async () => {
      User.create = jest.fn().mockReturnValue(mockUser);
      User.findById = jest.fn().mockReturnValue(mockUser);

      const res = await request(app).post("/users/sign-up").send({
        name: "aaa",
        image: "aaa",
        password: "aaa",
        biography: "aaa",
      });

      expect(res.statusCode).toBe(200);
    });

    test("It should respond with a status of 400 if the database delivers no users", async () => {
      User.create = jest.fn().mockRejectedValue(new Error());
      User.findById = jest.fn();

      const res = await request(app).post("/users/sign-up").send({
        name: "aaa",
        image: "aaa",
        password: "aaa",
        biography: "aaa",
      });

      expect(res.statusCode).toBe(400);
    });
  });
});

describe("Given a /users/all route", () => {
  describe("When requested with GET method", () => {
    test("Then it should respond with a status of 500 if the user is not authorised", async () => {
      User.find = jest.fn().mockReturnValue([mockUser]);

      const res = await request(app).get("/users/all");

      expect(res.statusCode).toBe(500);
    });
  });
});
