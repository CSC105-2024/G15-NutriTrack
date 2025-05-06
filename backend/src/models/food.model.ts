import db from "../lib/db.ts";

const getAllFoods = async () => {
  const foods = await db.food.findMany();
  return foods;
};

const getFoodById = async (id: number) => {
  return await db.food.findUnique({
    where: { id },
  });
};

export { getAllFoods, getFoodById };
