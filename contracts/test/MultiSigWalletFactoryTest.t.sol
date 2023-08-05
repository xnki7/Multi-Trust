// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test, console} from "forge-std/Test.sol";
import {DeployMultiSigWalletFactory} from "../script/DeployMultiSigWalletFactory.s.sol";
import {MultiSigWalletFactory} from "../src/MultiSigWalletFactory.sol";

contract MultiSigWalletFactoryTest is Test {
    MultiSigWalletFactory multiSigWalletFactory;

    address USER1 = makeAddr("user1");
    address USER2 = makeAddr("user2");
    address USER3 = makeAddr("user3");
    uint256 constant REQUIRED_APPROVALS = 2;
    address[] public addressArray;

    function setUp() external {
        addressArray.push(USER1);
        addressArray.push(USER2);
        addressArray.push(USER3);
        DeployMultiSigWalletFactory deployMultiSigWalletFactory = new DeployMultiSigWalletFactory();
        multiSigWalletFactory = deployMultiSigWalletFactory.run();
    }

    function testCreateWallet() public {
        vm.prank(USER1);
        multiSigWalletFactory.createWallet(addressArray, REQUIRED_APPROVALS);

        vm.prank(USER1);
        assertEq(multiSigWalletFactory.getMyWallets().length, 1);
    }
}
