import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { mainRouter } from "./routes/index.route.ts";
import { cors } from "hono/cors";

const app = new Hono();
app.use("*", cors());

app.route("", mainRouter);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
