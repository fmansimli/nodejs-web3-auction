"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jwt = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class Jwt {
    static verifyAsync(token) {
        return (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
    }
    static verifyAndIgnore(token) {
        return (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET, {
            ignoreExpiration: true
        });
    }
    static signAsync(payload, expiresIn = 5) {
        return (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET, { expiresIn });
    }
    static signKey(payload) {
        return (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET, { expiresIn: "420d" });
    }
    static async unpack(token) {
        return (0, jsonwebtoken_1.decode)(token);
    }
}
exports.Jwt = Jwt;
