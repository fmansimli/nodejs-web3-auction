// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Auction {
    string public title;
    uint256 public basePrice;
    mapping(address => uint256) public bidders;
    uint256 public finishTime = block.timestamp + 18 hours;
    address payable public creator;
    address public lastBidder;
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

    function finish() external onlyCreator {
        if (block.timestamp >= finishTime) {
            completed = true;

            if (bids.length > 0) {
                creator.transfer(basePrice);
            }
            return;
        }
        revert("auction still continue.");
    }

    function withdraw() external {
        require(bids.length > 0, "there is no withdraw for you.");

        if (block.timestamp >= finishTime) {
            completed = true;

            Bid storage lastBid = bids[bids.length - 1];

            if (lastBid.owner == msg.sender) {
                require(false, "you can not withdraw, you're winner!");
            }

            uint256 amount = bidders[msg.sender];

            if (amount > 0) {
                payable(msg.sender).transfer(amount);
                bidders[msg.sender] = 0;
                return;
            }
            revert("there is no withdraw for you.");
        }
        revert("auction still continue.");
    }

    function makeBid() external payable timeCheck onlyHigh {
        require(msg.sender != creator, "owner of auction can not bid!");

        bidders[msg.sender] += msg.value;
        uint256 _amount = bidders[msg.sender];

        Bid memory newbid = Bid({ amount: _amount, owner: payable(msg.sender) });
        bids.push(newbid);

        basePrice = _amount;
        lastBidder = msg.sender;
        finishTime = block.timestamp + 150;
    }

    function getLastBid() public view returns (Bid memory) {
        if (bids.length > 0) {
            return bids[bids.length - 1];
        }
        return Bid({ amount: basePrice, owner: payable(creator) });
    }

    function getAllBids() public view returns (Bid[] memory) {
        return bids;
    }

    function getAmountForBid(uint256 nextAmount) public view returns (uint256) {
        uint256 previousAmount = bidders[msg.sender];
        return nextAmount - previousAmount;
    }

    struct Summary {
        address _id;
        string title;
        address creator;
        uint256 basePrice;
        uint256 finishTime;
        address lastBidder;
        bool completed;
        Bid[] bids;
    }

    struct BasicInfo {
        address _id;
        string title;
        uint256 basePrice;
        uint256 finishTime;
        bool completed;
    }

    function getSummary() public view returns (Summary memory) {
        Summary memory summary = Summary({
            _id: address(this),
            title: title,
            creator: creator,
            basePrice: basePrice,
            finishTime: finishTime,
            completed: completed,
            lastBidder: lastBidder,
            bids: bids
        });

        return summary;
    }

    function getBasicInfo() public view returns (BasicInfo memory) {
        BasicInfo memory info = BasicInfo({
            _id: address(this),
            title: title,
            basePrice: basePrice,
            finishTime: finishTime,
            completed: completed
        });

        return info;
    }
}
