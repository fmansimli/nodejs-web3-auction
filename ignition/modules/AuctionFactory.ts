import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AuctionFactoryModule = buildModule("AuctionFactoryModule", (m) => {
  const factory = m.contract("AuctionFactory", [], {});

  return { factory };
});

export default AuctionFactoryModule;
