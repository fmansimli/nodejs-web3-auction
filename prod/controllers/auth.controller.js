"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.signin = void 0;
const errors_1 = require("../errors");
const user_1 = require("../models/user");
const utils_1 = require("../utils");
const jwt_1 = require("../services/jwt");
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
        const payload = { email, id: user._id, roles: ["4"] };
        const accessToken = jwt_1.Jwt.signAsync(payload, "1h");
        const refreshToken = jwt_1.Jwt.signAsync(payload, "12h");
        res.status(200).json({
            user: {
                _id: user._id,
                email: user.email
            },
            auth: { accessToken, refreshToken }
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
        const payload = { email, id: resp.insertedId, roles: ["4"] };
        const accessToken = jwt_1.Jwt.signAsync(payload, "1h");
        const refreshToken = jwt_1.Jwt.signAsync(payload, "12h");
        res.status(200).json({
            user: {
                _id: resp.insertedId,
                email: email,
                auth: { accessToken, refreshToken }
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.signup = signup;
