// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "./hyperlane/IHyperlaneRecipient.sol";
import "./axelar/IAxelarExecutable.sol";

import "./types/DataTypes.sol";

import "forge-std/console.sol";

contract StorageLayer is IHyperlaneRecipient, IAxelarExecutable {
    /// @dev maps storage state to a storage slot
    mapping(bytes32 storageSlot_ => StorageState) public state;

    /// @dev is a random index to make sure slots are unique
    uint256 public packetCounter;

    /// @dev is a mapping to check duplicates
    mapping(uint256 => mapping(uint256 => bool)) public isDuplicate;

    /// @dev is emitted when a new state is available at the storage layer
    event InitData(bytes32 slotId, bytes data, uint256 currState_);

    /// @dev is emitted when a new state is updated at the storage layer
    event UpdateData(bytes32 slotId, bytes data, uint256 currState_);

    /// @dev functions to receive message from remote execution layers
    function handle(uint32 _origin, bytes32 _sender, bytes calldata _message) external override {
        console.log("inga varala 0");
        _validateAndProcess(_message);
    }

    function execute(
        bytes32 commandId,
        string calldata sourceChain,
        string calldata sourceAddress,
        bytes calldata payload
    ) external override {
        console.log("inga varala 0");
        _validateAndProcess(payload);
    }

    function _validateAndProcess(bytes memory data_) internal {
        (bytes32 selector, uint256 originChain, uint256 originChainPayloadId, bytes memory state_) =
            abi.decode(data_, (bytes32, uint256, uint256, bytes));
        console.log("inga varala 1");
        console.logBytes32(selector);
        console.log(originChain);
        console.log(originChainPayloadId);
        console.logBytes32(keccak256("STORE_SELECTOR"));
        if (selector == keccak256("STORE_SELECTOR")) {
            console.log("entered");
            if (!isDuplicate[originChain][originChainPayloadId]) {
                console.log("entered again");
                bytes32 slot = keccak256(abi.encode(++packetCounter, data_));
                console.logBytes32(slot);
                state[slot] = abi.decode(state_, (StorageState));

                isDuplicate[originChain][originChainPayloadId] = true;
            }
        } else {
            (bytes32 slot, uint256 newState) = abi.decode(state_, (bytes32, uint256));
            state[slot].state_ = newState;
        }
    }
}
