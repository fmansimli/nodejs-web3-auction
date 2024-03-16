import type { RequestHandler } from "express";
import { Auction } from "../models/auction";
import { ObjectId } from "mongodb";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const auctions = await Auction.exec().find().toArray();

    res.status(200).json({ auctions });
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
        desc: "auction desc " + (index + 1),
        startingPrice: (index + 1) * 100
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
