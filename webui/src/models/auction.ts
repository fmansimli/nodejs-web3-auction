export class Auction {
  public _id: string;
  public title: string;
  public basePrice: number;
  public completed: boolean;
  public finishTime: number;

  constructor(attrs: Partial<Auction>) {
    Object.assign(this, attrs);
  }
}
