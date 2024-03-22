import type { RequestHandler } from "express";
import { User } from "../models/user";
import { ObjectId } from "mongodb";

export const profile: RequestHandler = async (req: any, res, next) => {
  try {
    const _id = new ObjectId(req.user.id as string);

    const user = await User.exec().findOne({ _id });
    const { password: _pwd, ...rest } = user as any;

    res.status(200).json({ user: rest });
  } catch (error) {
    next(error);
  }
};
