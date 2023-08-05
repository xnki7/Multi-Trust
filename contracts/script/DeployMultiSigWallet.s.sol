// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {MultiSigWallet} from "../src/MultiSigWallet.sol";

contract DeployMultiSigWallet is Script {
    function run(
        address[] memory addressArray,
        uint256 reqApprovals
    ) external returns (MultiSigWallet) {
        vm.startBroadcast();
        MultiSigWallet multiSigWallet = new MultiSigWallet(
            addressArray,
            reqApprovals
        );
        vm.stopBroadcast();
        return multiSigWallet;
    }
}
