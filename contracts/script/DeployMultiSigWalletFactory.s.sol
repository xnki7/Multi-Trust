// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {MultiSigWalletFactory} from "../src/MultiSigWalletFactory.sol";

contract DeployMultiSigWalletFactory is Script {
    function run() external returns (MultiSigWalletFactory) {
        vm.startBroadcast();
        MultiSigWalletFactory multiSigWalletFactory = new MultiSigWalletFactory();
        vm.stopBroadcast();
        return multiSigWalletFactory;
    }
}
