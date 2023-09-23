// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./hyperlane/IMailbox.sol";
import "./axelar/IAxelarGateway.sol";

abstract contract ExecutionLayer {
    /// @dev is the mailbox of hyperlane
    IMailbox public mailbox;

    /// @dev is the gateway of axelar
    IAxelarGateway public gateway;

    constructor(IMailbox mailbox_, IAxelarGateway gateway_) {
        mailbox = mailbox_;
        gateway = gateway_;
    }

    /// @dev allows anyone on the execution layer to store a new id on the storage layer
    /// @param extInfo_ ipfs hash of the info
    /// @param state_ could be any random state of this info initially
    /// @param accesslist_ is the addresses that can acess this id on a remote chain
    /// @param allowChainIds_ is the allowlist of chain ids [optional]
    function initializeStorage(
        bytes memory extInfo_,
        uint256 state_,
        address[] memory accesslist_,
        uint256[] memory allowChainIds_
    ) external {}

    /// @dev allows someone to create their own version of the id in the storage
    /// @param id_ is the slot of the storage to update on the storage layer
    /// @dev id_ is generated at the point of storage during execution
    /// @param state_ could be any random state of this info initially
    function updateStorage(bytes32 id_, uint256 state_) external {}

    /// @dev is a helper function to send the state to storage layer
    /// @dev uses the bridge that's available for the commns (either hyperlane / axelar)
    function _syncRemoteChain() internal {}
}
