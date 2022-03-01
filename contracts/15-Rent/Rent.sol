// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Rent {

    address payable public landlord;
    string public tenantName;
    uint public tenantAge;
    string public tenantOccupation;

    /**
     * @dev Constructor
     * @param name Tenant name
     * @param age Tenant age
     * @param occupation Tenant occupation
     */
    constructor (string memory name, uint age, string memory occupation) {
        tenantName = name;
        tenantAge = age;
        tenantOccupation = occupation;
        landlord = payable(msg.sender);
    }

    /**
     * @dev receive ether function
     */
    receive() external payable {
        landlord.transfer(msg.value);
    }
}