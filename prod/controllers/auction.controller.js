"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAll = exports.getById = exports.createBulk = exports.create = exports.getAll = void 0;
const auction_1 = require("../models/auction");
const mongodb_1 = require("mongodb");
const getAll = async (req, res, next) => {
    try {
        const auctions = await auction_1.Auction.exec().find().toArray();
        res.status(200).json({ auctions });
    }
    catch (error) {
        next(error);
    }
};
exports.getAll = getAll;
const create = async (req, res, next) => {
    const { title, desc } = req.body;
    try {
        const auction = new auction_1.Auction({ title, desc });
        await auction_1.Auction.exec().insertOne(auction);
        res.status(201).json({ auction });
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
const createBulk = async (req, res, next) => {
    try {
        const auctions = new Array(100).fill(0).map((number, index) => {
            const auction = new auction_1.Auction({
                title: "auction title " + (index + 1),
                desc: "auction desc " + (index + 1),
                startingPrice: (index + 1) * 100
            });
            return auction;
        });
        const resp = await auction_1.Auction.exec().insertMany(auctions);
        res.status(201).json(resp);
    }
    catch (error) {
        next(error);
    }
};
exports.createBulk = createBulk;
const getById = async (req, res, next) => {
    try {
        const _id = new mongodb_1.ObjectId(req.params.id);
        const auction = await auction_1.Auction.exec().findOne({ _id });
        res.status(200).json({ auction });
    }
    catch (error) {
        next(error);
    }
};
exports.getById = getById;
const deleteAll = async (req, res, next) => {
    try {
        const resp = await auction_1.Auction.exec().deleteMany();
        res.status(200).json(resp);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteAll = deleteAll;
