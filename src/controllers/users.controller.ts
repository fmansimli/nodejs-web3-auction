import type { RequestHandler } from "express";
import { User } from "../models/user";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const users = await User.exec().find().toArray();

    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

export const deleteAll: RequestHandler = async (req, res, next) => {
  try {
    const resp = await User.exec().deleteMany();

    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
};
