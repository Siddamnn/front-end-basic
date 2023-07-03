//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Bank {
    uint256 public balance;
    address payable public owner;

    constructor() {
        // Set the initial value of `balance` to zero
        balance = 0;
        owner = payable(msg.sender);
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function withdraw(uint256 amount) public {
        require((amount > 0 && amount <= this.getBalance()), "Invalid Amount");
        balance = balance - amount;
    }

    function deposit(uint256 amount) public {
        balance = balance + amount;
    }
}
