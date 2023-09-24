// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/StorageLayer.sol";
import "../src/ExecutionLayer.sol";

import "../src/token-poc/StatefulERC20.sol";
import "../src/token-poc/StatelessERC20.sol";

import {AxelarHelper} from "pigeon/axelar/AxelarHelper.sol";
import {HyperlaneHelper} from "pigeon/hyperlane/HyperlaneHelper.sol";

contract ERC20Test is Test {
    address public user;

    uint256 EXECUTION_CHAIN_FORK_ID;
    uint256 STORAGE_CHAIN_FORK_ID;

    StorageLayer public storageContract;
    ExecutionLayer public executionContract;

    AxelarHelper public axelarHelper;
    HyperlaneHelper public hyperlaneHelper;

    string constant STORAGE_CHAIN_AXELAR_CHAIN_ID = "ethereum-2";
    uint32 constant STORAGE_CHAIN_HYPERLANE_CHAIN_ID = 5;

    string constant EXECUTION_CHAIN_AXELAR_CHAIN_ID = "polygon";
    uint32 constant EXECUTION_CHAIN_HYPERLANE_CHAIN_ID = 80001;

    address public PolygonMailbox = 0xCC737a94FecaeC165AbCf12dED095BB13F037685;
    address public PolygonGateway = 0xBF62ef1486468a6bd26Dd669C06db43dEd5B849B;

    address public PolygonIGP = 0x8f9C3888bFC8a5B25AED115A82eCbb788b196d2a;
    address public PolygonGasService = 0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6;

    StatefulERC20 public ERC20;
    StatelessERC20 public ERC20_STATELESS;

    function setUp() external {
        STORAGE_CHAIN_FORK_ID = vm.createSelectFork(vm.envString("STORAGE_CHAIN_RPC"));
        EXECUTION_CHAIN_FORK_ID = vm.createSelectFork(vm.envString("EXECUTION_CHAIN_RPC"));

        console.log("Created Forks", STORAGE_CHAIN_FORK_ID, EXECUTION_CHAIN_FORK_ID);

        /// @dev deploy main contracts
        _deployContracts();

        /// @dev deploy helper contracts
        _deployHelpers();

        /// @dev deploy the helpers
        _deployERC20();

        /// @dev generate a test user
        user = vm.addr(420);
        vm.deal(user, 10 ether);
    }

    function test_erc20() external {
        vm.selectFork(EXECUTION_CHAIN_FORK_ID);

        vm.recordLogs();
        vm.prank(user);
        ERC20_STATELESS.transfer{value: 2 ether}(address(421), 2e18);

        Vm.Log[] memory _logs = vm.getRecordedLogs();
        axelarHelper.help(
            EXECUTION_CHAIN_AXELAR_CHAIN_ID,
            0xe432150cce91c13a887f7D836923d5597adD8E31,
            /// axelar gateway on ETH
            STORAGE_CHAIN_AXELAR_CHAIN_ID,
            STORAGE_CHAIN_FORK_ID,
            _logs
        );

        hyperlaneHelper.help(
            PolygonMailbox,
            PolygonMailbox,
            /// to mailbox but hyperlane uses create 2
            STORAGE_CHAIN_FORK_ID,
            _logs
        );

        vm.selectFork(STORAGE_CHAIN_FORK_ID);
        assertEq(ERC20.balance(address(421)), 2e18);
    }

    function _deployContracts() internal {
        vm.selectFork(STORAGE_CHAIN_FORK_ID);
        storageContract = new StorageLayer();

        vm.selectFork(EXECUTION_CHAIN_FORK_ID);
        executionContract =
        new ExecutionLayer(IMailbox(PolygonMailbox), IHyperlanePaymaster(PolygonIGP), IAxelarGateway(PolygonGateway),IAxelarGasService(PolygonGasService),  address(storageContract));
    }

    function _deployHelpers() internal {
        vm.selectFork(EXECUTION_CHAIN_FORK_ID);

        axelarHelper = new AxelarHelper();
        hyperlaneHelper = new HyperlaneHelper();
    }

    function _deployERC20() internal {
        vm.selectFork(STORAGE_CHAIN_FORK_ID);
        vm.prank(user);
        ERC20 = new StatefulERC20();

        vm.selectFork(EXECUTION_CHAIN_FORK_ID);
        ERC20_STATELESS = new StatelessERC20(IExecutionLayer(address(executionContract)), address(ERC20));
    }
}
