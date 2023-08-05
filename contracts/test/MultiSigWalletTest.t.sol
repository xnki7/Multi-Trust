// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test, console} from "forge-std/Test.sol";
import {DeployMultiSigWallet} from "../script/DeployMultiSigWallet.s.sol";
import {MultiSigWallet} from "../src/MultiSigWallet.sol";

contract MultiSigWalletTest is Test {
    MultiSigWallet multiSigWallet;

    address USER1 = makeAddr("user1");
    address USER2 = makeAddr("user2");
    address USER3 = makeAddr("user3");
    address USER4 = makeAddr("user4");
    uint256 constant STARTING_BALANCE = 10 ether;
    uint256 constant REQUIRED_APPROVALS = 2;
    address[] public addressArray;

    function setUp() external {
        vm.deal(USER1, STARTING_BALANCE);
        vm.deal(USER2, STARTING_BALANCE);
        vm.deal(USER3, STARTING_BALANCE);
        addressArray.push(USER1);
        addressArray.push(USER2);
        addressArray.push(USER3);
        DeployMultiSigWallet deployMultiSigWallet = new DeployMultiSigWallet();
        multiSigWallet = deployMultiSigWallet.run(
            addressArray,
            REQUIRED_APPROVALS
        );
    }

    function testOwners() public {
        assertEq(multiSigWallet.getOwners(), addressArray);
    }

    function testRequiredApprovals() public {
        assertEq(multiSigWallet.getRequiredApprovals(), REQUIRED_APPROVALS);
    }

    function testTransactionSubmission() public {
        vm.prank(USER1);
        multiSigWallet.submit(USER4, 3);
        assertEq(multiSigWallet.getAllTransactions().length, 1);
    }

    // Also check --> Submit event was created or not.

    function testApproval() public {
        vm.prank(USER1);
        multiSigWallet.submit(USER4, 3);
        vm.prank(USER2);
        multiSigWallet.approve(0);
        vm.prank(USER2);
        bool isApproved = multiSigWallet.checkIfApproved(0);
        assertEq(isApproved, true);
    }

    // Also check --> Approve event was created or not.

    function testFundingToWallet() public {
        vm.prank(USER1);
        payable(address(multiSigWallet)).transfer(5); // Send 5 Wei to the contract's address
        assertEq(address(multiSigWallet).balance, 5);
    }

    function testExecute() public {
        uint256 startingUSER4Balance = USER4.balance;

        vm.prank(USER1);
        payable(address(multiSigWallet)).transfer(5);

        vm.prank(USER1);
        multiSigWallet.submit(USER4, 3);

        vm.prank(USER1);
        multiSigWallet.approve(0);

        vm.prank(USER2);
        multiSigWallet.approve(0);

        vm.prank(USER3);
        multiSigWallet.execute(0);

        assertEq(USER4.balance, startingUSER4Balance + 3);
    }

    function testRevoke() public {
        vm.prank(USER1);
        payable(address(multiSigWallet)).transfer(5);

        vm.prank(USER1);
        multiSigWallet.submit(USER4, 3);

        vm.prank(USER1);
        multiSigWallet.approve(0);

        vm.prank(USER2);
        multiSigWallet.approve(0);

        vm.prank(USER2);
        multiSigWallet.revoke(0);

        vm.expectRevert();
        vm.prank(USER1);
        multiSigWallet.execute(0);
    }
}
