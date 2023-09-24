// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";

import "../src/StorageLayer.sol";
import "../src/ExecutionLayer.sol";

import "../src/token-poc/StatefulERC20.sol";
import "../src/token-poc/StatelessERC20.sol";

contract E2EDeploy is Script {
    address storageLayer;
    address executionLayer;

    address ERC20;
    address ERC20_STATE_LESS;
    address public PolygonMailbox = 0xCC737a94FecaeC165AbCf12dED095BB13F037685;
    address public PolygonGateway = 0xBF62ef1486468a6bd26Dd669C06db43dEd5B849B;

    address public PolygonIGP = 0x8f9C3888bFC8a5B25AED115A82eCbb788b196d2a;
    address public PolygonGasService = 0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6;

    function setUp() external {}

    function run() external {
        vm.createSelectFork(vm.envString("STORAGE_CHAIN_RPC"));
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));

        storageLayer = address(new StorageLayer());
        ERC20 = address(new StatefulERC20(0x93Cc7e20315cF896129D4343cfC2F2F0a88901A1));
        vm.stopBroadcast();

        vm.createSelectFork(vm.envString("EXECUTION_CHAIN_RPC"));
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));
        executionLayer = address(
            new ExecutionLayer(IMailbox(PolygonMailbox), IHyperlanePaymaster(PolygonIGP), IAxelarGateway(PolygonGateway),IAxelarGasService(PolygonGasService), storageLayer)
        );
        ERC20_STATE_LESS = address(new StatelessERC20(IExecutionLayer(executionLayer), ERC20));
        vm.stopBroadcast();
    }
}
