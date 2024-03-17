"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errors = exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "8";
    Role["USER"] = "4";
    Role["AUTHOR"] = "9";
})(Role || (exports.Role = Role = {}));
var Errors;
(function (Errors) {
    Errors["UNAUTHORIZED"] = "UNAUTHORIZED";
    Errors["NO_SESSION_FOUND"] = "NO_SESSION_FOUND";
    Errors["ACCESS_DENIED"] = "ACCESS_DENIED";
    Errors["TOKEN_EXPIRED"] = "TOKEN_EXPIRED";
    Errors["TOKEN_MALFORMED"] = "TOKEN_MALFORMED";
    Errors["NO_TOKEN_PROVIDED"] = "NO_TOKEN_PROVIDED";
    Errors["VALIDATION_ERROR"] = "VALIDATION_ERROR";
    Errors["WRONG_CREDENTIALS"] = "WRONG_CREDENTIALS";
    Errors["ONLY_FOR_TEST"] = "ONLY_FOR_TEST";
    Errors["ALREADY_EXISTS"] = "ALREADY_EXISTS";
    Errors["REDIS_CONNECTION_ERROR"] = "REDIS_CONNECTION_ERROR";
    Errors["MONGO_CONNECTION_ERROR"] = "MONGO_CONNECTION_ERROR";
    Errors["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
    Errors["NOT_FOUND"] = "NOT_FOUND";
})(Errors || (exports.Errors = Errors = {}));
