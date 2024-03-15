import type { Response, NextFunction } from "express";
import { ForbiddenError, UnauthorizedError } from "../errors";
import { Jwt } from "../services/jwt";
import { Role, Errors } from "../enums";

export const access = (role = Role.USER) => {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (token) {
        const data: any = Jwt.verifyAsync(token);
        if (data.roles.includes(role)) {
          req.user = data;
          return next();
        } else {
          throw new ForbiddenError(Errors.ACCESS_DENIED);
        }
      }
      throw new UnauthorizedError(Errors.NO_TOKEN_PROVIDED);
    } catch (error) {
      next(error);
    }
  };
};
