import type { RequestHandler } from "express";
import { SignInDto } from "../validations/signin-dto";
import { BadRequestError } from "../errors";
import { User } from "../models/user";
import { Password } from "../utils";
import { Jwt } from "../services/jwt";

export const signin: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body as SignInDto;

  try {
    const user = await User.exec().findOne({ email });
    if (!user) {
      throw new BadRequestError("email or password is in correct!");
    }

    const pwdMatch = await Password.compare(user.password, password);
    if (!pwdMatch) {
      throw new BadRequestError("email or password is in correct!");
    }

    const payload = { email, id: user._id, roles: ["0", "9"] };
    const accessToken = Jwt.signAsync(payload, "4h");
    const refreshToken = Jwt.signAsync(payload, "24h");

    res.status(200).json({
      user: {
        _id: user._id,
        email: user.email
      },
      auth: { accessToken, refreshToken }
    });
  } catch (error) {
    next(error);
  }
};

export const signup: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body as SignInDto;

  try {
    const userExists = await User.exec().findOne({ email });

    if (userExists) {
      throw new BadRequestError("this email is already in use");
    }

    const hashed = await Password.toHash(password);
    const resp = await User.exec().insertOne({ email, password: hashed });

    const payload = { email, id: resp.insertedId, roles: ["0", "9"] };
    const accessToken = Jwt.signAsync(payload, "4h");
    const refreshToken = Jwt.signAsync(payload, "24h");

    res.status(200).json({
      user: {
        _id: resp.insertedId,
        email: email
      },
      auth: { accessToken, refreshToken }
    });
  } catch (error) {
    next(error);
  }
};

export const anonymous: RequestHandler = async (req, res, next) => {
  try {
    const payload = { id: "", roles: ["0"] };
    const accessToken = Jwt.signAsync(payload, "4h");

    res.status(200).json({ user: null, auth: { accessToken } });
  } catch (error) {
    next(error);
  }
};
