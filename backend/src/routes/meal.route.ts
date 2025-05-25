import { Hono } from "hono";
import { addFoodToLog, getMealPlans } from "../controllers/meal.controller.ts";

const mealRouter = new Hono();

mealRouter.get("/plans", getMealPlans);
mealRouter.post("/addfood", addFoodToLog);

export { mealRouter };
