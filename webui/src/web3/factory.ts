import web3 from "./web3";
import meta from "../artifacts/AuctionFactory.json";
import deployedAddress from "../artifacts/deployed_addresses.json";

const address = deployedAddress["AuctionFactoryModule#AuctionFactory"];

const factory = new web3.eth.Contract(meta.abi, address);

export default factory;
