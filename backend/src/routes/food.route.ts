import { Hono } from "hono";
import * as foodController from "../controllers/food.controller.ts";

const foodRouter = new Hono();

foodRouter.get("/", foodController.getFoods);

export { foodRouter };
