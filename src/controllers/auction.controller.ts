import type { RequestHandler } from "express";
import { Auction } from "../models/auction";
import { ObjectId } from "mongodb";
import { BadRequestError } from "../errors";

export const getAll: RequestHandler = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query || {};

  try {
    const skip = (+page - 1) * +limit;

    if (isNaN(skip)) {
      throw new BadRequestError("invalid query params.");
    }

    const auctions = await Auction.exec().find().skip(skip).limit(+limit).toArray();
    const totalCount = await Auction.exec().countDocuments();

    const pageCount = Math.ceil(totalCount / +limit);

    res.status(200).json({ auctions, meta: { totalCount, pageCount } });
  } catch (error) {
    next(error);
  }
};

export const create: RequestHandler = async (req, res, next) => {
  const { title, desc } = req.body;
  try {
    const auction = new Auction({ title, desc });
    await Auction.exec().insertOne(auction);

    res.status(201).json({ auction });
  } catch (error) {
    next(error);
  }
};

export const createBulk: RequestHandler = async (req, res, next) => {
  try {
    const auctions = new Array(100).fill(0).map((number, index) => {
      const auction = new Auction({
        title: "auction title " + (index + 1),
        address: "0x00000000000000000000000000",
        desc: "auction desc " + (index + 1),
        basePrice: (index + 1) * 1000000000000000
      });

      return auction;
    });

    const resp = await Auction.exec().insertMany(auctions);

    res.status(201).json(resp);
  } catch (error) {
    next(error);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  try {
    const _id = new ObjectId(req.params.id);
    const auction = await Auction.exec().findOne({ _id });

    res.status(200).json({ auction });
  } catch (error) {
    next(error);
  }
};

export const deleteAll: RequestHandler = async (req, res, next) => {
  try {
    const resp = await Auction.exec().deleteMany();

    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
};
