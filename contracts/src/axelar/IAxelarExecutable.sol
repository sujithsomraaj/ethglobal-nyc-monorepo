// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IAxelarExecutable {
    function execute(
        bytes32 commandId,
        string calldata sourceChain,
        string calldata sourceAddress,
        bytes calldata payload
    ) external;
}
