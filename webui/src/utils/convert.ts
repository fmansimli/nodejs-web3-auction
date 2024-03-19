import web3 from "../web3/web3";

export class Convert {
  static toWei(eth: string) {
    return web3.utils.toWei(eth, "ether");
  }

  static toEth(wei: string) {
    return web3.utils.fromWei(wei, "ether");
  }
}
