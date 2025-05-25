import { Context } from "hono";
import * as mealModel from "../models/meal.model.ts";

const getMealPlans = async (c: Context) => {
  try {
    const { userId, date } = c.req.query();

    if (!userId || !date) {
      return c.json(
        { error: "Missing required parameters: userId and date" },
        400,
      );
    }

    const mealPlans = await mealModel.getMealPlans(userId, date);
    return c.json({
      success: true,
      data: mealPlans,
    });
  } catch (err) {
    console.error("Error fetching meal plans:", err);
    return c.json({ error: "Internal Server Error" }, 500);
  }
};

const addFoodToLog = async (c: Context) => {
  try {
    const { userId, date, type, foodId } = await c.req.json();
    const mealLog = await mealModel.addFoodToLog(userId, date, type, foodId);
    console.log(mealLog);
    return c.json({
      success: true,
      data: mealLog,
      msg: "Added new food",
    });
  } catch {
    return c.json({ error: "Internal Server Error" }, 500);
  }
};

export { getMealPlans, addFoodToLog };
