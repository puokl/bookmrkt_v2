import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateUserInput, UpdateUserInput } from "../schema/user.schema";
import {
  createUser,
  findAndUpdateUser,
  findUser,
} from "../service/user.service";
// import logger from "../utils/logger";

// @desc    Create a user
// @route   POST /api/users
// @access  Public
export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    // return res.send(omit(user.toJSON(), "password"));
    console.log("user in backend createuser", user);
    return res.send(user);
  } catch (e: any) {
    console.error(e);
    return res.status(409).send(e.message);

    // 409 for conflict ( we assume it has violated the unique field in the user model)
  }
}

// @desc    Update user image
// @route   PUT /api/users/:userId
// @access  Private
export async function updateUserHandler(
  req: Request<UpdateUserInput["params"]>,
  res: Response
) {
  console.log("res.locals.user", res.locals.user);
  const userId = res.locals.user._id;
  const update = { image: req.body.image };
  const oldUser = await findUser({ _id: userId });
  if (!oldUser) {
    return res.sendStatus(404);
  }
  console.log("update in updateUserHandler", update);
  const user = await findAndUpdateUser({ _id: userId }, update, {
    new: true,
  });
  console.log("user updateUserHandler", user);

  const newUser = { user };

  return res.send({ user });
}

// @desc    Get current user
// @route   GET /api/me
// @access  Private
export async function getCurrentUser(req: Request, res: Response) {
  return res.send(res.locals.user);
}

// @desc    Get current session
// @route   GET /sessions/getLog
// @access  Private
export async function getLog(req: Request, res: Response) {
  return res.send(console.log("getLog works", res.locals.user));
}
