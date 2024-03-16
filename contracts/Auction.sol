// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract AuctionFactory {
    address[] public auctions;
    address payable public factoryOwner;

    constructor() {
        factoryOwner = payable(msg.sender);
    }

    function createAuction(string memory title, uint256 basePrice) public payable {
        require(
            msg.value >= 0.001 ether,
            "you need to pay minimum 0.001 ether to create an auction"
        );

        address auction = address(new Auction(title, basePrice, payable(msg.sender)));
        auctions.push(auction);
        factoryOwner.transfer(address(this).balance);
    }

    function transferAllCommissions() public {
        require(msg.sender == factoryOwner, "only factory owner do this operation");
        factoryOwner.transfer(address(this).balance);
    }

    function getAuctions() public view returns (address[] memory) {
        return auctions;
    }
}

contract Auction {
    string public title;
    uint256 public basePrice;
    mapping(address => uint256) public bidders;
    uint256 public finishTime = block.timestamp + 1000000;
    address payable public creator;
    bool public completed;
    Bid[] public bids;

    constructor(string memory _title, uint256 _basePrice, address payable _creator) {
        title = _title;
        basePrice = _basePrice;
        creator = _creator;
    }

    struct Bid {
        uint256 amount;
        address payable owner;
    }

    modifier onlyHigh() {
        require(
            msg.value + bidders[msg.sender] > basePrice,
            "you need to bid higher than current price."
        );
        _;
    }

    modifier timeCheck() {
        require(block.timestamp < finishTime, "oh, auction already finished.");
        _;
    }

    modifier onlyCreator() {
        require(msg.sender == creator, "only creator can do this operation!");
        _;
    }

    function getBlockTime() public view returns (uint256) {
        return block.timestamp;
    }

    function finish() public onlyCreator {
        if (block.timestamp >= finishTime) {
            completed = true;

            if (bids.length > 0) {
                creator.transfer(basePrice);
            }
            return;
        }
        require(false, "auction still continue.");
    }

    function withdraw() public {
        require(bids.length > 0, "you did not bid any amount!");

        if (block.timestamp >= finishTime) {
            completed = true;

            Bid storage lastBid = bids[bids.length - 1];

            if (lastBid.owner == msg.sender) {
                require(false, "you can not withdraw, you won the auction!");
            }

            uint256 amount = bidders[msg.sender];

            if (amount > 0) {
                payable(msg.sender).transfer(amount);
                bidders[msg.sender] = 0;
                return;
            }
            require(false, "you did not bid any amount.");
        }
        require(false, "auction still continue.");
    }

    function makeBid() public payable timeCheck onlyHigh {
        require(msg.sender != creator, "owner of auction can not bid!");

        bidders[msg.sender] += msg.value;
        uint256 _amount = bidders[msg.sender];

        Bid memory newbid = Bid({ amount: _amount, owner: payable(msg.sender) });
        bids.push(newbid);

        basePrice = _amount;
        finishTime = block.timestamp + 100;
    }

    function getLastBid() public view returns (Bid memory) {
        if (bids.length > 0) {
            return bids[bids.length - 1];
        }
        return Bid({ amount: basePrice, owner: payable(creator) });
    }

    function getAllBid() public view returns (Bid[] memory) {
        return bids;
    }

    function getAmountForBid(uint256 nextAmount) public view returns (uint256) {
        uint256 previousAmount = bidders[msg.sender];
        return nextAmount - previousAmount;
    }

    function getSummary()
        public
        view
        returns (string memory, address, uint256, uint256, bool, Bid[] memory)
    {
        return (title, creator, basePrice, finishTime, completed, bids);
    }
}
