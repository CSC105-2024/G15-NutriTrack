import type { Context } from "hono";
import * as userModel from "../models/user.model.ts";
import { CreateUserBody } from "../types/index.ts";
import bcrypt from "bcryptjs";

const createUser = async (c: Context) => {
  try {
    const { name, email, password } = await c.req.json<CreateUserBody>();

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

    const user = await userModel.findByEmail(email);

    if (user) {
      return c.json({
        success: false,
        data: null,
        msg: "Email already exists",
      });
    }

    const newUser = await userModel.createUser(email, password, name);

    const { password: _, ...safeUser } = newUser;

    return c.json({
      success: true,
      data: safeUser,
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

const loginUser = async (c: Context) => {
  try {
    const { email, password } = await c.req.json();
    const user = await userModel.findByEmail(email);

    if (!user) {
      return c.json(
        {
          success: false,
          data: null,
          msg: "Email doesn't exist",
        },
        401,
      );
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return c.json(
        {
          success: false,
          data: null,
          msg: "Invalid credentials",
        },
        401,
      );
    }

    const { password: _, ...safeUser } = user;
    return c.json({ success: true, data: safeUser, msg: "Login successful" });
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

export { createUser, loginUser };
