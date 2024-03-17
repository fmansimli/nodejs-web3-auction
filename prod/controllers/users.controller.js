"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAll = exports.getAll = void 0;
const user_1 = require("../models/user");
const getAll = async (req, res, next) => {
    try {
        const users = await user_1.User.exec().find().toArray();
        res.status(200).json({ users });
    }
    catch (error) {
        next(error);
    }
};
exports.getAll = getAll;
const deleteAll = async (req, res, next) => {
    try {
        const resp = await user_1.User.exec().deleteMany();
        res.status(200).json(resp);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteAll = deleteAll;
