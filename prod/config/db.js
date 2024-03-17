"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongo = void 0;
const mongodb_1 = require("mongodb");
class AppMongo {
    get client() {
        if (!this.instance) {
            throw new Error("mongo client has not been initialized yet");
        }
        return this.instance;
    }
    get db() {
        if (!this.instance) {
            throw new Error("mongo client has not been initialized yet!");
        }
        return this.instance.db("mydb");
    }
    connect(url) {
        this.instance = new mongodb_1.MongoClient(url);
        return this.instance.connect();
    }
}
exports.mongo = new AppMongo();
