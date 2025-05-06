import { Hono } from "hono";
import { userRouter } from "./user.route.ts";
import { foodRouter } from "./food.route.ts";

const mainRouter = new Hono();

mainRouter.route("/auth", userRouter);
mainRouter.route("/api/foods", foodRouter);

export { mainRouter };
