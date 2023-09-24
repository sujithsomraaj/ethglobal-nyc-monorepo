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
        // vm.createSelectFork(vm.envString("STORAGE_CHAIN_RPC"));
        // vm.startBroadcast(vm.envUint("PRIVATE_KEY"));

        // storageLayer = address(new StorageLayer());
        // ERC20 = address(new StatefulERC20(0x93Cc7e20315cF896129D4343cfC2F2F0a88901A1));
        // vm.stopBroadcast();

        vm.createSelectFork(vm.envString("POLYGON_ZK_RPC"));
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));
        executionLayer = address(
            new ExecutionLayer(IMailbox(address(0)), IHyperlanePaymaster(address(0)), IAxelarGateway(0x999117D44220F33e0441fbAb2A5aDB8FF485c54D),IAxelarGasService(0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6), 0x36602dd0E00C6Ed0b4e3c463214002dBaAf7baC4)
        );
        ERC20_STATE_LESS =
            address(new StatelessERC20(IExecutionLayer(executionLayer), 0x119d3635362b8371c9865D0c4720617Fb5133b43));
        vm.stopBroadcast();
    }
}
