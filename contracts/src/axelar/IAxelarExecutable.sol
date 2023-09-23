// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

interface IAxelarExecutable {
    function execute(
        bytes32 commandId,
        string calldata sourceChain,
        string calldata sourceAddress,
        bytes calldata payload
    ) external;
}
