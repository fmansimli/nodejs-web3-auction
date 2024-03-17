import { time, loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("Auction Contract", () => {
  async function auctionFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();
    const AuctionFactory = await hre.ethers.getContractFactory("AuctionFactory");
    const factory = await AuctionFactory.deploy();

    return { owner, otherAccount, factory };
  }

  describe("Auction Factory Deployment", () => {
    it("should set the right factory owner", async function () {
      const { factory, otherAccount, owner } = await loadFixture(auctionFixture);

      expect(await factory.factoryOwner()).to.equal(owner);
    });
  });
});
