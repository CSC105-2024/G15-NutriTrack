import type { Context } from "hono";
import * as userModel from "../models/user.model.ts";
import { CreateUserBody } from "../types/index.ts";

const createUser = async (c: Context) => {
  try {
    const body = await c.req.json<CreateUserBody>();

    const { name, email, password } = body;
    if (!name || !email || !password) {
      return c.json(
        {
          success: false,
          data: null,
          msg: "Missing required fields",
        },
        400,
      );
    }

    if (await userModel.isDuplicate(email)) {
      return c.json({
        success: false,
        data: null,
        msg: "Email already exists",
      });
    }

    const newUser = await userModel.createUser(email, password, name);

    const { password: _, ...user } = newUser;

    return c.json({
      success: true,
      data: user,
      msg: "Created new user!",
    });
  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `${e}`,
      },
      500,
    );
  }
};

export { createUser };
