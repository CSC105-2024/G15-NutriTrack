import db from "../lib/db.ts";

const getAllFoods = async () => {
  const foods = await db.defaultFood.findMany();
  return foods;
};

const getFoodById = async (id: string) => {
  return await db.defaultFood.findUnique({
    where: { id },
  });
};

export { getAllFoods, getFoodById };
