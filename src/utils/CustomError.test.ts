import { CustomError, ICustomError } from "./CustomError";

describe("Given a CustomError class", () => {
  describe("When instantiated with a code, a message 'Error' and a private message 'Invalid password'", () => {
    test("It should deliver an error equal displayed as a normal error", () => {
      const expectedResult = new Error("Error");

      const result = new CustomError(500, "Error", "Invalid password");

      expect(result).toEqual(expectedResult);
    });

    test("It should deliver an error that also contains a private message and a specific code", () => {
      const expectedResult = {
        code: 500,
        message: "Error",
        privateMessage: "Invalid password",
      } as Partial<ICustomError>;

      const result = new CustomError(500, "Error", "Invalid password");

      expect(result.message).toBe(expectedResult.message);
      expect(result.privateMessage).toBe(expectedResult.privateMessage);
      expect(result.code).toBe(expectedResult.code);
    });
  });
});
