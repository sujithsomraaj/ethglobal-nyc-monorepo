// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "../types/DataTypes.sol";

interface IExecutionLayer {
    function initializeStorage(StorageState memory crsData_) external payable;
}

contract StatelessERC20 {
    IExecutionLayer public execLayer;
    address public statefulContract;

    constructor(IExecutionLayer execLayer_, address statefulContract_) {
        execLayer = execLayer_;
        statefulContract = statefulContract_;
    }

    function transfer(address to, uint256 amount) external payable {
        /// @dev FIXME: validate if the caller is allowed
        address[] memory user = new address[](2);
        uint256[] memory additions = new uint256[](2);
        uint256[] memory removals = new uint256[](2);

        user[0] = msg.sender;
        user[1] = to;

        additions[0] = 0;
        additions[1] = amount;

        removals[0] = amount;
        removals[1] = 0;

        bytes memory data = abi.encode(user, additions, removals);
        execLayer.initializeStorage{value: msg.value}(
            StorageState(data, 0, statefulContract, new address[](0), new uint256[](0))
        );
    }
}
