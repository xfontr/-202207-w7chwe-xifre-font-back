import bcrypt from "bcryptjs";

export const hashCreate = (password: string): Promise<string> => {
  const salt = 10;
  return bcrypt.hash(password, salt);
};

export const hashCompare = (
  dataToCompare: string,
  hash: string
): Promise<boolean> => bcrypt.compare(dataToCompare, hash);
