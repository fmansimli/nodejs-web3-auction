"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.access = void 0;
const errors_1 = require("../errors");
const jwt_1 = require("../services/jwt");
const enums_1 = require("../enums");
const access = (role = enums_1.Role.USER) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (token) {
                const data = jwt_1.Jwt.verifyAsync(token);
                if (data.roles.includes(role)) {
                    req.user = data;
                    return next();
                }
                else {
                    throw new errors_1.ForbiddenError(enums_1.Errors.ACCESS_DENIED);
                }
            }
            throw new errors_1.UnauthorizedError(enums_1.Errors.NO_TOKEN_PROVIDED);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.access = access;
