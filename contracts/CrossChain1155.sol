// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC1155 } from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";

contract CrossChain1155 is ERC1155, AccessControl {

    bytes32 constant public CROSS_CHAIN_RECIEVER = keccak256("CROSS_CHAIN_RECIEVER");

    constructor(
        string memory _name,
        address crossChainReciever
    ) ERC1155(_name) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(CROSS_CHAIN_RECIEVER, crossChainReciever);
    }

    function mintTo(address to, uint256 tokenId, uint256 amount) external onlyRole(CROSS_CHAIN_RECIEVER) {
        _mint(to, tokenId, amount, "");
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

}
