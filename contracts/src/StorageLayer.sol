// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./hyperlane/IHyperlaneRecipient.sol";
import "./axelar/IAxelarExecutable.sol";

import "./types/DataTypes.sol";

contract StorageLayer is IHyperlaneRecipient, IAxelarExecutable {
    /// @dev maps storage state to a storage slot
    mapping(bytes32 storageSlot_ => StorageState) public state;

    /// @dev is emitted when a new state is available at the storage layer
    event InitData(bytes32 slotId, bytes data, uint256 currState_);

    /// @dev is emitted when a new state is updated at the storage layer
    event UpdateData(bytes32 slotId, bytes data, uint256 currState_);

    /// @dev functions to receive message from remote execution layers
    function handle(uint32 _origin, bytes32 _sender, bytes calldata _message) external override {}

    function execute(
        bytes32 commandId,
        string calldata sourceChain,
        string calldata sourceAddress,
        bytes calldata payload
    ) external override {}
}
