import type { ErrorRequestHandler, RequestHandler } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import { CustomError } from "../errors/custom-error";
import { join } from "path";

export const catch404: RequestHandler = async (req, res, next) => {
  try {
    res.status(404).sendFile(join(process.cwd(), "./prod/public/index.html"));
  } catch (error) {
    next(error);
  }
};

export const catchError: ErrorRequestHandler = (err, req, res, _next) => {
  try {
    if (err instanceof CustomError) {
      return res.status(err.httpCode).json(err.serialize());
    }

    if (err instanceof TokenExpiredError) {
      return res.status(401).json({
        httpCode: 401,
        message: err.message,
        name: err.name
      });
    }

    res.status(500).json({
      httpCode: 500,
      message: "something went wrong",
      name: "UnknownError"
    });
  } catch (error) {
    res.status(500).json({
      httpCode: 500,
      message: "something went wrong",
      name: "UnknownError"
    });
  }
};
