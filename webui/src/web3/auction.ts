import web3 from "./web3";
import meta from "../artifacts/Auction.json";

class Auction {
  static from(address: string) {
    const auction = new web3.eth.Contract(meta.abi, address);
    return auction;
  }
}

export default Auction;
