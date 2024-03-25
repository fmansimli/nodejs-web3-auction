"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.anonymous = exports.signup = exports.signin = void 0;
const errors_1 = require("../errors");
const user_1 = require("../models/user");
const utils_1 = require("../utils");
const jwt_1 = require("../services/jwt");
const TOKEN_EXPIRE_TIME = 12 * 60 * 60 * 1000;
const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await user_1.User.exec().findOne({ email });
        if (!user) {
            throw new errors_1.BadRequestError("email or password is in correct!");
        }
        const pwdMatch = await utils_1.Password.compare(user.password, password);
        if (!pwdMatch) {
            throw new errors_1.BadRequestError("email or password is in correct!");
        }
        const payload = { email, id: user._id, roles: ["0", "9"] };
        const accessToken = jwt_1.Jwt.signAsync(payload, "3h");
        const refreshToken = jwt_1.Jwt.signAsync(payload, "12h");
        res.cookie("token", refreshToken, {
            httpOnly: true,
            expires: new Date(Date.now() + TOKEN_EXPIRE_TIME),
            secure: false
        });
        res.status(200).json({
            user: { _id: user._id, email: user.email },
            auth: { accessToken }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.signin = signin;
const signup = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const userExists = await user_1.User.exec().findOne({ email });
        if (userExists) {
            throw new errors_1.BadRequestError("this email is already in use");
        }
        const hashed = await utils_1.Password.toHash(password);
        const resp = await user_1.User.exec().insertOne({ email, password: hashed });
        const payload = { email, id: resp.insertedId, roles: ["0", "9"] };
        const accessToken = jwt_1.Jwt.signAsync(payload, "3h");
        const refreshToken = jwt_1.Jwt.signAsync(payload, "12h");
        res.cookie("token", refreshToken, {
            httpOnly: true,
            expires: new Date(Date.now() + TOKEN_EXPIRE_TIME),
            secure: false
        });
        res.status(200).json({
            user: { _id: resp.insertedId, email: email },
            auth: { accessToken }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.signup = signup;
const anonymous = async (req, res, next) => {
    try {
        const payload = { id: "", roles: ["0"] };
        const accessToken = jwt_1.Jwt.signAsync(payload, "3h");
        res.status(200).json({ user: null, auth: { accessToken } });
    }
    catch (error) {
        next(error);
    }
};
exports.anonymous = anonymous;
const refresh = async (req, res, next) => {
    try {
        const token = req.headers.cookie?.split("=")[1];
        if (!token) {
            throw new errors_1.UnauthorizedError("UNAUTHORIZED");
        }
        const payload = jwt_1.Jwt.verifyAndIgnore(token);
        const { iat: _iat, exp: _exp, ...rest } = payload;
        const accessToken = jwt_1.Jwt.signAsync(rest, "3h");
        const refreshToken = jwt_1.Jwt.signAsync(rest, "12h");
        res.cookie("token", refreshToken, {
            httpOnly: true,
            expires: new Date(Date.now() + TOKEN_EXPIRE_TIME),
            secure: false
        });
        res.status(200).json({ auth: { accessToken } });
    }
    catch (error) {
        next(error);
    }
};
exports.refresh = refresh;
