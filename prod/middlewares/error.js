"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchError = exports.catch404 = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const custom_error_1 = require("../errors/custom-error");
const path_1 = require("path");
const catch404 = async (req, res, next) => {
    try {
        res.status(404).sendFile((0, path_1.join)(process.cwd(), "./prod/public/index.html"));
    }
    catch (error) {
        next(error);
    }
};
exports.catch404 = catch404;
const catchError = (err, req, res, _next) => {
    try {
        if (err instanceof custom_error_1.CustomError) {
            return res.status(err.httpCode).json(err.serialize());
        }
        if (err instanceof jsonwebtoken_1.TokenExpiredError) {
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
    }
    catch (error) {
        res.status(500).json({
            httpCode: 500,
            message: "unknown error"
        });
    }
};
exports.catchError = catchError;
