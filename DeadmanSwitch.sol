// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract DeadmanSwitch {
    using SafeMath for uint256;
    uint256 public timePeriod;
    

    address public owner;
    constructor() {
        owner = msg.sender;
        timePeriod = block.number + 10;
    }
    
    uint256 public Balance;
   
    
    // Restriction 
    modifier onlyOwner() {
        require(msg.sender == owner, "Address is not Owner!!");
        _;
    }

      // Deposit
    function depositEthers() public payable {
        Balance = Balance.add(msg.value);
    }

     // Withdraw
    function withdrawEthers(uint256 amount) public onlyOwner {
        require(Balance >= amount);
        Balance = Balance.sub(amount);
        payable(owner).transfer(amount);
    }

    function still_alive() public onlyOwner {
        require(block.number < timePeriod);
        timePeriod = block.number + 10;
    }

    function dead() public {
        require(block.number > timePeriod);
        uint256 ethBalance = address(this).balance;
        Balance = Balance.sub(ethBalance);
        payable(owner).transfer(ethBalance);
    }


} 
