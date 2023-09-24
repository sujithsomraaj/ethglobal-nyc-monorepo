// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "./hyperlane/IMailbox.sol";
import "./hyperlane/IHyperlanePaymaster.sol";
import "./axelar/IAxelarGateway.sol";
import "./axelar/IAxelarGasService.sol";

import "./types/DataTypes.sol";
import "./libraries/AddressString.sol";

contract ExecutionLayer {
    /// @dev is the storage layer chain id (for axelar)
    string public constant AXELAR_STORAGE_CHAIN_ID = "ethereum-2";

    /// @dev is the storage layer chain id (for hyperlane)
    uint32 public constant HYPERLANE_STORAGE_CHAIN_ID = 5;

    /// @dev is the storage layer contract
    address public immutable STORAGE_AGGREGATOR;

    /// @dev is the mailbox of hyperlane
    IMailbox public mailbox;

    /// @dev is the gas paymaster of hyperlane
    IHyperlanePaymaster public igp;

    /// @dev is the gas service of axelar
    IAxelarGasService public gasService;

    /// @dev is the gateway of axelar
    IAxelarGateway public gateway;

    /// @dev is the payload counter
    uint256 public payloadCounter;

    /// @dev selectors for the store and update
    bytes32 STORE_SELECTOR = keccak256("STORE_SELECTOR");
    bytes32 UPDATE_SELECTOR = keccak256("UPDATE_SELECTOR");

    constructor(
        IMailbox mailbox_,
        IHyperlanePaymaster igp_,
        IAxelarGateway gateway_,
        IAxelarGasService gasService_,
        address storageContract_
    ) {
        mailbox = mailbox_;
        gateway = gateway_;
        igp = igp_;
        gasService = gasService_;

        STORAGE_AGGREGATOR = storageContract_;
    }

    receive() external payable {}

    /// @dev allows anyone on the execution layer to store a new id on the storage layer
    /// @param crsData_ is the init data (check DataTypes for type)
    function initializeStorage(StorageState memory crsData_) external payable {
        ++payloadCounter;
        _syncRemoteChain(abi.encode(STORE_SELECTOR, block.chainid, payloadCounter, abi.encode(crsData_)));
    }

    /// @dev allows someone to create their own version of the id in the storage
    /// @param id_ is the slot of the storage to update on the storage layer
    /// @dev id_ is generated at the point of storage during execution
    /// @param state_ could be any random state of this info initially
    function updateStorage(bytes32 id_, uint256 state_) external payable {
        bytes memory crsData_ = abi.encode(id_, state_);
        _syncRemoteChain(abi.encode(UPDATE_SELECTOR, block.chainid, 0, crsData_));
    }

    /// @dev is a helper function to send the state to storage layer
    /// @dev uses the bridge that's available for the commns (either hyperlane / axelar (or) both)
    /// @param data_ is the data to be sent across-chains
    function _syncRemoteChain(bytes memory data_) internal {
        uint256 count;

        if (address(mailbox) != address(0)) {
            try mailbox.dispatch(HYPERLANE_STORAGE_CHAIN_ID, _castAddr(STORAGE_AGGREGATOR), data_) returns (bytes32 id)
            {
                ++count;
                igp.payForGas{value: address(this).balance}(id, HYPERLANE_STORAGE_CHAIN_ID, 500000, address(this));
            } catch {}
        }

        if (address(gateway) != address(0)) {
            try gateway.callContract(AXELAR_STORAGE_CHAIN_ID, AddressToString.toString(STORAGE_AGGREGATOR), data_) {
                ++count;
                gasService.payNativeGasForContractCall{value: address(this).balance}(
                    msg.sender, AXELAR_STORAGE_CHAIN_ID, AddressToString.toString(STORAGE_AGGREGATOR), data_, msg.sender
                );
            } catch {}
        }

        /// @dev storage chain should be invoked by a call here
        if (count == 0) {
            revert();
        }
    }

    /// @dev converts address to bytes32
    function _castAddr(address addr_) internal pure returns (bytes32) {
        return bytes32(uint256(uint160(addr_)));
    }
}
