// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract borrowDapp {
    IERC20 public daiToken;

    mapping (address => uint256) public applicant;
    

    constructor(address daiAdd) {
        daiToken = IERC20(daiAdd);
    }

    

    function applyLoan() public payable {
        uint256 value = daiToken.balanceOf(address(this));
        uint256 deposit = msg.value;
        require(deposit < value,"Insufficient Dai Token");
        require(applicant[msg.sender] == 0,"Already Loan Taken!!");
        applicant[msg.sender] = deposit;
        daiToken.transfer(msg.sender, deposit/2);
    }

    function repayLoan(uint256 value) public {
        require(value == applicant[msg.sender]/2,"Insufficiant Loan");
        require(value <= daiToken.balanceOf(msg.sender),"Insufficiant balance!!");
        daiToken.transferFrom(msg.sender,address(this), value);
        payable(msg.sender).transfer(applicant[msg.sender]);
        applicant[msg.sender] = 0;
    }
}  