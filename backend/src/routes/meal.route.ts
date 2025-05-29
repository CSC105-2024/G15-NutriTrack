import { Hono } from "hono";
import {
  addFoodToLog,
  getMealPlans,
  removeFoodFromLog,
} from "../controllers/meal.controller.ts";

const mealRouter = new Hono();

mealRouter.get("/plans", getMealPlans);
mealRouter.post("/addfood", addFoodToLog);
mealRouter.post("/removefood", removeFoodFromLog);

export { mealRouter };
