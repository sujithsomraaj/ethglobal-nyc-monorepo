/// @dev stores a remote chain info
struct StorageState {
    bytes extInfo_;
    uint256 state_;
    address[] accessList_;
    uint256[] allowedChainIds;
}
