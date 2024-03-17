import { time, loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("Auction Contract", () => {
  async function auctionFixture() {
    const [owner, address2, address3] = await hre.ethers.getSigners();

    const Auction = await hre.ethers.getContractFactory("Auction");

    const TITLE = "auction1";
    const BASE_PRICE = 2000;

    const auction = await Auction.deploy(TITLE, BASE_PRICE, owner);

    return { auction, TITLE, BASE_PRICE, owner, address2, address3 };
  }

  describe("Auction Deployment", () => {
    it("should correctly set title, basePrice and creator", async () => {
      const { TITLE, BASE_PRICE, owner, auction } = await loadFixture(auctionFixture);

      const title = await auction.title();
      const basePrice = await auction.basePrice();
      const creator = await auction.creator();

      expect(title).to.be.equal(TITLE);
      expect(basePrice).to.be.equal(BASE_PRICE);
      expect(creator).to.be.equal(owner);
    });

    it("should have greater finish time when first created", async () => {
      const { auction } = await loadFixture(auctionFixture);

      const blockTime = await time.latest();
      const finishTime = await auction.finishTime();

      const HALF_OF_HOUR = 1800000;

      expect(finishTime).to.be.greaterThan(blockTime);
      expect(Number(finishTime) - blockTime).to.be.closeTo(HALF_OF_HOUR, 1);
    });
  });

  describe("Auction Actions", () => {
    it("should not allow make a bid lower than first-base price", async () => {
      const { auction, BASE_PRICE } = await loadFixture(auctionFixture);

      const promise = auction.makeBid({ value: BASE_PRICE });
      await expect(promise).to.be.revertedWith("you need to bid higher than current price.");
    });

    it("should not allow owner to make a bid", async () => {
      const { auction, BASE_PRICE } = await loadFixture(auctionFixture);

      await expect(auction.makeBid({ value: BASE_PRICE + 1 })).to.be.revertedWith(
        "owner of auction can not bid!"
      );
    });

    it("should not allow to make a bid after finishTime", async () => {
      const { BASE_PRICE, address2, auction } = await loadFixture(auctionFixture);

      await time.increaseTo(Number.MAX_SAFE_INTEGER);
      const promise = auction.connect(address2).makeBid({ value: BASE_PRICE + 1 });

      await expect(promise).to.be.revertedWith("oh, auction already finished.");
    });

    it("it should not allow to make a bid, after newly-assigned-finishtime", async () => {
      const { auction, address2, address3, BASE_PRICE } = await loadFixture(auctionFixture);

      await auction.connect(address2).makeBid({ value: BASE_PRICE * 2 });

      const finishTime = await auction.finishTime();
      await time.increaseTo(finishTime);

      const promise = auction.connect(address3).makeBid({ value: BASE_PRICE * 3 });
      await expect(promise).to.be.revertedWith("oh, auction already finished.");
    });

    it("should not allow to make a bid <= newly-assigned-basePrice", async () => {
      const { address2, address3, auction, BASE_PRICE } = await loadFixture(auctionFixture);

      await auction.connect(address2).makeBid({ value: BASE_PRICE * 2 });

      const promise = auction.connect(address3).makeBid({ value: BASE_PRICE * 2 });
      await expect(promise).to.be.revertedWith("you need to bid higher than current price.");
    });

    it("should be able to get the last bid", async () => {
      const { auction, address2, BASE_PRICE } = await loadFixture(auctionFixture);

      await auction.connect(address2).makeBid({ value: BASE_PRICE * 2 });
      const lastBid = await auction.bids(0);

      expect(lastBid.owner).to.be.equal(address2);
      expect(lastBid.amount).to.be.equal(BASE_PRICE * 2);
    });

    it("should be able to get the last bid. ('getLastBid')", async () => {
      const { auction, address2, BASE_PRICE } = await loadFixture(auctionFixture);

      await auction.connect(address2).makeBid({ value: BASE_PRICE * 2 });
      const lastBid = await auction.getLastBid();

      expect(lastBid.owner).to.be.equal(address2);
      expect(lastBid.amount).to.be.equal(BASE_PRICE * 2);
    });

    it("should get the base price as a bid, if there are no bids. ('getLastBid')", async () => {
      const { auction, BASE_PRICE, owner } = await loadFixture(auctionFixture);

      const lastBid = await auction.getLastBid();

      expect(lastBid.owner).to.be.equal(owner);
      expect(lastBid.amount).to.be.equal(BASE_PRICE);
    });

    it("should retrive all bids", async () => {
      const { BASE_PRICE, address2, owner, auction } = await loadFixture(auctionFixture);

      const _bids = await auction.getAllBids();
      expect(_bids.length).to.be.equal(0);

      await auction.connect(address2).makeBid({ value: BASE_PRICE * 2 });
      const bids = await auction.getAllBids();
      expect(bids.length).to.be.equal(1);
    });

    it("should retrive summary information about action", async () => {
      const { auction, BASE_PRICE, TITLE, address2, owner } = await loadFixture(
        auctionFixture
      );

      const TIME = await time.latest();

      await auction.connect(address2).makeBid({ value: BASE_PRICE * 2 });
      const data = await auction.getSummary();

      expect(data.title).to.be.equal(TITLE);
      expect(data.basePrice).to.be.equal(BASE_PRICE * 2);
      expect(data.finishTime).to.be.greaterThan(TIME);
      expect(data.completed).to.be.equal(false);
      expect(data.creator).to.be.equal(owner);
      expect(data.bids[0].owner).to.be.equal(address2);
      expect(data.bids[0].amount).to.be.equal(BASE_PRICE * 2);
    });
  });
});
