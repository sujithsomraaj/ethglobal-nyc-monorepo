// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "forge-std/console.sol";

contract StatefulERC20 {
    string public name = "STATEFUL_ERC20_DEMO";
    string public symbol = "SERC20DEMO";

    uint256 public decimal = 18;

    uint256 public totalSupply = 1e24;

    mapping(address => uint256) public balance;

    event TransferCompleted(address from, address to, uint256 amount);

    constructor(address _owner) {
        balance[_owner] = totalSupply;
        emit TransferCompleted(address(0), _owner, totalSupply);
    }

    function syncState(bytes memory data_) public {
        /// @dev FIXME: validate if the caller is allowed
        (address[] memory user, uint256[] memory additions, uint256[] memory removals) =
            abi.decode(data_, (address[], uint256[], uint256[]));

        for (uint256 i; i < user.length; ++i) {
            console.log(user[i], additions[i], removals[i]);
            console.log(balance[user[i]]);
            balance[user[i]] += additions[i];
            balance[user[i]] -= removals[i];
        }

        emit TransferCompleted(user[0], user[1], additions[1]);
    }
}
