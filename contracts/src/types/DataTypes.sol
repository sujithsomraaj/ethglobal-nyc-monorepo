// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

/// @dev stores a remote chain info
struct StorageState {
    bytes extInfo_;
    uint256 state_;
    address[] accessList_;
    uint256[] allowedChainIds;
}
