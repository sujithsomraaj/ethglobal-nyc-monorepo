// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./hyperlane/IHyperlaneRecipient.sol";
import "./axelar/IAxelarExecutable.sol";

contract StorageLayer is IHyperlaneRecipient, IAxelarExecutable {
    /// @dev stores a remote chain info
    struct StorageState {
        bytes extInfo_;
        uint256 state_;
        address[] accessList_;
        uint256[] allowedChainIds;
    }

    /// @dev maps storage state to a storage slot
    mapping(bytes32 storageSlot_ => StorageState) public state;

    /// @dev is emitted when a new state is available at the storage layer
    event InitData(bytes32 slotId, bytes data, uint256 currState_);

    /// @dev is emitted when a new state is updated at the storage layer
    event UpdateData(bytes32 slotId, bytes data, uint256 currState_);
}
