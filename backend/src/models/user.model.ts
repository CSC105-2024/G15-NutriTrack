import db from "../lib/db.ts";

const findByEmail = async (email: string) => {
  const mail = await db.user.findUnique({
    where: { email },
  });
  return mail;
};

const createUser = async (email: string, password: string, name: string) => {
  const user = await db.user.create({
    data: { email, password, name },
  });
  return user;
};

export { findByEmail as isDuplicate, createUser };
