// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import { Auction } from "./Auction.sol";

contract AuctionFactory {
    address[] public auctions;
    address payable public factoryOwner;

    constructor() {
        factoryOwner = payable(msg.sender);
    }

    event Transfer(uint amount, address to, uint when);

    function createAuction(
        string memory title,
        string memory desc,
        uint256 basePrice
    ) public payable {
        require(
            msg.value >= 0.0001 ether,
            "you need to pay minimum 0.0001 ether to create an auction"
        );

        address auction = address(new Auction(title, desc, basePrice, payable(msg.sender)));
        auctions.push(auction);
    }

    function transferAllCommissions() public {
        require(msg.sender == factoryOwner, "only factory owner can do this operation");

        emit Transfer(address(this).balance, factoryOwner, block.timestamp);
        factoryOwner.transfer(address(this).balance);
    }

    function getAuctions() public view returns (address[] memory) {
        return auctions;
    }
}
