// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

interface IHyperlanePaymaster {
    event GasPayment(bytes32 indexed messageId, uint256 gasAmount, uint256 payment);

    function payForGas(bytes32 _messageId, uint32 _destinationDomain, uint256 _gasAmount, address _refundAddress)
        external
        payable;

    function quoteGasPayment(uint32 _destinationDomain, uint256 _gasAmount) external view returns (uint256);
}
