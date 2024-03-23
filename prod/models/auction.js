"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auction = void 0;
const db_1 = require("../config/db");
class Auction {
    constructor(attrs) {
        this.createdAt = new Date();
        Object.assign(this, attrs);
    }
    static exec() {
        return db_1.mongo.db.collection("auctions");
    }
}
exports.Auction = Auction;
