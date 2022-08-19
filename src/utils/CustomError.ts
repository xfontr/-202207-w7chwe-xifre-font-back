/* eslint-disable @typescript-eslint/lines-between-class-members */
export interface ICustomError extends Error {
  code: number;
  message: string;
  privateMessage: string;
}

export class CustomError extends Error implements ICustomError {
  code: number;
  message: string;
  privateMessage: string;

  constructor(code: number, publicMessage: string, privateMessage: string) {
    super();

    this.code = code ?? 500;
    this.message = publicMessage;
    this.privateMessage = privateMessage ?? "";
  }
}
