export class Bid {
  public amount: number;
  public owner: string;

  constructor(attrs: Partial<Bid>) {
    Object.assign(this, attrs);
  }
}
