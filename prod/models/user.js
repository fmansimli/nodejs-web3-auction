"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const db_1 = require("../config/db");
class User {
    constructor(attrs) {
        Object.assign(this, attrs);
    }
    static exec() {
        return db_1.mongo.db.collection("users");
    }
}
exports.User = User;
