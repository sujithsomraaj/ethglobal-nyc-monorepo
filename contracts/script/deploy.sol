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

    address public PolygonIGP = 0x8f9C3888bFC8a5B25AED115A82eCbb788b196d2a;
    address public PolygonGasService = 0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6;

    function setUp() external {}

    function run() external {
        vm.createSelectFork(vm.envString("STORAGE_CHAIN_RPC"));
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));

        storageLayer = address(new StorageLayer());
        vm.stopBroadcast();

        vm.createSelectFork(vm.envString("EXECUTION_CHAIN_RPC"));
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));
        executionLayer = address(
            new ExecutionLayer(IMailbox(PolygonMailbox), IHyperlanePaymaster(PolygonIGP), IAxelarGateway(PolygonGateway),IAxelarGasService(PolygonGasService), storageLayer)
        );
        vm.stopBroadcast();
    }
}
