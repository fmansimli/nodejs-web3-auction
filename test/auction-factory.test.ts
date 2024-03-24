import { time, loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("Auction Factory Contract", () => {
  async function auctionFixture() {
    const [owner, address2] = await hre.ethers.getSigners();
    const AuctionFactory = await hre.ethers.getContractFactory("AuctionFactory");
    const factory = await AuctionFactory.deploy();

    return { owner, address2, factory };
  }

  describe("Auction Factory Deployment", () => {
    it("should set the right factory owner", async function () {
      const { factory, owner, address2 } = await loadFixture(auctionFixture);

      expect(await factory.factoryOwner()).to.equal(owner);
    });
  });

  describe("Auction Factory Actions", () => {
    it("should create an auction", async () => {
      const { factory } = await loadFixture(auctionFixture);

      await factory.createAuction("auction1", "desc1", 1000, {
        value: hre.ethers.parseUnits("0.001", "ether")
      });

      const auction = await factory.auctions(0);
      expect(auction).to.not.equal(undefined);
    });

    it("should retrive all auctions", async () => {
      const { factory } = await loadFixture(auctionFixture);

      await factory.createAuction("auction1", "desc1", 1000, {
        value: hre.ethers.parseUnits("0.001", "ether")
      });

      await factory.createAuction("auction2", "desc1", 1000, {
        value: hre.ethers.parseUnits("1", "ether")
      });

      const auctions = await factory.getAuctions();
      expect(auctions.length).to.be.equal(2);
    });

    it("should not allow a non-owner to transfer the commissions", async () => {
      const { address2, factory } = await loadFixture(auctionFixture);

      const reason = "only factory owner can do this operation";
      const promise = factory.connect(address2).transferAllCommissions();

      //await expect(promise).to.be.not.reverted;
      await expect(promise).to.be.revertedWith(reason);
    });

    it("should not allow a non-owner to transfer the commissions (2nd way)", async () => {
      const { address2, factory } = await loadFixture(auctionFixture);

      try {
        await factory.connect(address2).transferAllCommissions();
        expect(1).to.equal(2);
      } catch (error: any) {
        expect(error);
      }
    });

    it("should transfer all commissions to the owner", async () => {
      const { owner, address2, factory } = await loadFixture(auctionFixture);

      await factory.connect(address2).createAuction("auction1", "desc1", 1000, {
        value: hre.ethers.parseUnits("3", "ether")
      });

      await factory.connect(address2).createAuction("auction2", "desc2", 1000, {
        value: hre.ethers.parseUnits("4", "ether")
      });

      const prevBalance = await hre.ethers.provider.getBalance(owner);
      await factory.transferAllCommissions();

      const currentBalance = await hre.ethers.provider.getBalance(owner);
      const differnce = parseFloat(hre.ethers.formatEther(currentBalance - prevBalance));

      expect(differnce).to.be.greaterThan(6);
    });
  });

  describe("Auction Factory Events", () => {
    it("should emit an event on Transfers", async function () {
      const { owner, factory } = await loadFixture(auctionFixture);

      await expect(factory.transferAllCommissions())
        .to.emit(factory, "Transfer")
        .withArgs(anyValue, owner.address, anyValue);
    });
  });
});
