// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface ICrossChain {
    function mintTo(address to) external;
    function mintTo(address to, uint256 tokenId) external;
    function mintTo(address to, uint256 tokenId, uint256 amount) external;
}
