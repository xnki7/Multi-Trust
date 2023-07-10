// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./MultiSigWallet";

contract MultiSigFactory {
    event WalletCreated(address walletAddress);

    mapping(address => bool) private s_multiSigWallets;

    function createWallet(
        address[] memory _owners,
        uint256 _required
    ) external {
        MultiSigWallet wallet = new MultiSigWallet(_owners, _required);
        s_multiSigWallets[address(wallet)] = true;
        emit WalletCreated(address(wallet));
    }

    function walletExists(address walletAddress) external view returns (bool) {
        return s_multiSigWallets[walletAddress];
    }
}