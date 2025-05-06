import db from "../lib/db.ts";
import bcrypt from "bcryptjs";

const findByEmail = async (email: string) => {
  const mail = await db.user.findUnique({
    where: { email },
  });
  return mail;
};

const createUser = async (email: string, password: string, name: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: { email, password: hashedPassword, name },
  });
  return user;
};

export { findByEmail, createUser };
