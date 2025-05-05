import db from "../lib/db.ts";

const isDuplicate = async (email: string) => {
  const duplicate = await db.user.findUnique({
    where: { email },
  });
  return duplicate;
};

const createUser = async (email: string, password: string, name: string) => {
  const user = await db.user.create({
    data: { email, password, name },
  });
  return user;
};

export { isDuplicate, createUser };
