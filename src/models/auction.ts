import type { ObjectId } from "mongodb";
import { mongo } from "../config/db";

export class Auction {
  public _id?: ObjectId;
  public title: string;
  public desc: string;
  public startingPrice: number;
  public createdAt = new Date();

  constructor(attrs: Partial<Auction>) {
    Object.assign(this, attrs);
  }

  static exec() {
    return mongo.db.collection("auctions");
  }
}
