import bcrypt from "bcryptjs";

const hashCreate = (password: string): Promise<string> => {
  const salt = 10;
  return bcrypt.hash(password, salt);
};

export default hashCreate;
