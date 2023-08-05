//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

import {MultiSigWallet} from "../src/MultiSigWallet.sol";
import {Test, console} from "forge-std/Test.sol";
import {Script} from "forge-std/Script.sol";

contract MultiSigWalletTest is Script, Test {
    MultiSigWallet multiSigWallet;

    address USER = makeAddr("user");
    uint256 constant STARTING_BALANCE = 10 ether;
    uint256 private constant REQ_APPROVALS = 1;

    address private constant RECEIVERS_ADDRESS = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
    uint256 private constant RECEIVING_AMOUNT = 2 ether;
    address[] private owners = [
        0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266,
        0x70997970C51812dc3A010C7d01b50e0d17dc79C8
    ];

    function setUp() external {
        vm.startBroadcast();
        multiSigWallet = new MultiSigWallet(owners, REQ_APPROVALS);
        multiSigWallet.submit(RECEIVERS_ADDRESS, RECEIVING_AMOUNT);
        vm.stopBroadcast();
        vm.deal(USER, STARTING_BALANCE);
    }

    function testSubmit() public{
        vm.prank(USER);
        vm.expectRevert();
        multiSigWallet.submit(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, 2);
    }

    function testGetOwners() public {
        address[] memory gotOwners = multiSigWallet.getOwners();
        assertEq(gotOwners, owners);
    }

    function testContractBalance() public{
        uint256 contractBalance = multiSigWallet.getBalance();
        assertEq(contractBalance, address(multiSigWallet).balance);
    }

    function testRequiredApprovals() public{
        uint256 requiredApprovals = multiSigWallet.getRequiredApprovals();
        assertEq(requiredApprovals, REQ_APPROVALS);
    }
}
