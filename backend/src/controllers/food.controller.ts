import { Context } from "hono";
import * as foodModel from "../models/food.model.ts";

const getFoods = async (c: Context) => {
  try {
    const foods = await foodModel.getAllFoods();
    return c.json(foods);
  } catch (err) {
    return c.json({ err: "Internal Server Error" }, 500);
  }
};

export { getFoods };
