"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = void 0;
const user_1 = require("../models/user");
const mongodb_1 = require("mongodb");
const profile = async (req, res, next) => {
    try {
        const _id = new mongodb_1.ObjectId(req.user.id);
        const user = await user_1.User.exec().findOne({ _id });
        res.status(200).json({ user });
    }
    catch (error) {
        next(error);
    }
};
exports.profile = profile;
