import type { Bid } from "./bid";

export class Auction {
  public _id: string;
  public title: string;
  public basePrice: number;
  public completed: boolean;
  public finishTime: number;
  public blockTime: number;
  public creator: string;
  public lastBidder: string;
  public bids: Bid[];

  constructor(attrs: Partial<Auction>) {
    Object.assign(this, attrs);
  }
}
