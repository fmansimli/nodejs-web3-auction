// @ts-nocheck
import { Web3 } from "web3";

let web3: Web3;

if (typeof window.ethereum !== "undefined") {
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  const HTTP_PROVIDER_URL = import.meta.env.VITE_ALCHEMY_API_URL;
  const provider = new Web3.providers.HttpProvider(HTTP_PROVIDER_URL);
  web3 = new Web3(provider);
}

export default web3;
