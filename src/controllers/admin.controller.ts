import type { RequestHandler } from "express";
import { Jwt } from "../services/jwt";

export const createJwtKey: RequestHandler = async (req, res, next) => {
  try {
    const jwtKey = Jwt.signKey({ roles: ["6", "9"] });

    res.status(200).json({ jwt: jwtKey });
  } catch (error) {
    next(error);
  }
};

export const test: RequestHandler = async (req, res, next) => {
  try {
    res.status(200).json({ test: true });
  } catch (error) {
    next(error);
  }
};

export const checkJwt: RequestHandler = async (req, res, next) => {
  try {
    const token = req.body.token;

    if (token) {
      const payload = Jwt.verifyAsync(token!);
      return res.status(200).json({ payload });
    }

    res.status(200).json({ payload: {} });
  } catch (error) {
    next(error);
  }
};
