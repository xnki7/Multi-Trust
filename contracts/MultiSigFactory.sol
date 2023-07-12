// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./MultiSigWallet.sol";

contract MultiSigFactory {
    event WalletCreated(address walletAddress);

    mapping(address => address[]) addressToWallets;

    function createWallet(
        address[] memory _owners,
        uint256 _required
    ) external {
        MultiSigWallet wallet = new MultiSigWallet(_owners, _required);
        for(uint i=0; i<_owners.length; i++){
            addressToWallets[_owners[i]].push(address(wallet));
        }
        emit WalletCreated(address(wallet));
    }

    function getMyWallets() public view returns(address[] memory){
        return addressToWallets[msg.sender];
    }
}