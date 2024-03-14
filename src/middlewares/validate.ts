import type { Request, Response, NextFunction } from "express";
import { validate as validateBody } from "class-validator";
import { plainToInstance } from "class-transformer";

import { ValidationError } from "../errors/validation-error";

export const validate = (Dto: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const values = plainToInstance(Dto, req.body, {
        excludeExtraneousValues: true
      });
      const errors = await validateBody(values);

      if (errors.length > 0) {
        throw new ValidationError(errors);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
