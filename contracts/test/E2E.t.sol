// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";

contract E2ETest is Test {
    uint256 EXECUTION_CHAIN_FORK_ID;
    uint256 STORAGE_CHAIN_FORK_ID;

    string constant STORAGE_CHAIN_AXELAR_CHAIN_ID = "ethereum-2";
    uint32 constant STORAGE_CHAIN_HYPERLANE_CHAIN_ID = 5;

    string constant EXECUTION_CHAIN_AXELAR_CHAIN_ID = "polygon";
    uint32 constant EXECUTION_CHAIN_HYPERLANE_CHAIN_ID = 80001;

    function setUp() external {
        STORAGE_CHAIN_FORK_ID = vm.createSelectFork(vm.envString("STORAGE_CHAIN_RPC"));
        EXECUTION_CHAIN_FORK_ID = vm.createSelectFork(vm.envString("EXECUTION_CHAIN_RPC"));

        console.log("Created Forks", STORAGE_CHAIN_FORK_ID, EXECUTION_CHAIN_FORK_ID);

        
    }

    function test_e2e() external {}
}
