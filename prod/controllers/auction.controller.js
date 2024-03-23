"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAll = exports.getById = exports.createBulk = exports.create = exports.getAll = void 0;
const auction_1 = require("../models/auction");
const mongodb_1 = require("mongodb");
const errors_1 = require("../errors");
const getAll = async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query || {};
    try {
        const skip = (+page - 1) * +limit;
        if (isNaN(skip)) {
            throw new errors_1.BadRequestError("invalid query params.");
        }
        const auctions = await auction_1.Auction.exec().find().skip(skip).limit(+limit).toArray();
        const totalCount = await auction_1.Auction.exec().countDocuments();
        const pageCount = Math.ceil(totalCount / +limit);
        res.status(200).json({ auctions, meta: { totalCount, pageCount } });
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
                address: "0x00000000000000000000000000",
                desc: "auction desc " + (index + 1),
                basePrice: (index + 1) * 1000000000000000
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
