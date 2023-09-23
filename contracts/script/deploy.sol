// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/StorageLayer.sol";
import "../src/ExecutionLayer.sol";

contract E2EDeploy is Script {
    address storageLayer;
    address executionLayer;

    address public PolygonMailbox = 0xCC737a94FecaeC165AbCf12dED095BB13F037685;
    address public PolygonGateway = 0xBF62ef1486468a6bd26Dd669C06db43dEd5B849B;

    function setUp() external {}

    function run() external {
        // vm.createSelectFork(vm.envString("STORAGE_CHAIN_RPC"));
        // vm.startBroadcast(vm.envUint("PRIVATE_KEY"));

        // storageLayer = address(new StorageLayer());
        // vm.stopBroadcast();

        vm.createSelectFork(vm.envString("EXECUTION_CHAIN_RPC"));
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));
        executionLayer = address(
            new ExecutionLayer(IMailbox(PolygonMailbox), IAxelarGateway(PolygonGateway), 0x9851c54B1E85722632B65230f51aBE396C7B09f8)
        );
        vm.stopBroadcast();
    }
}
