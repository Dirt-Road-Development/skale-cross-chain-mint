// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";

contract CrossChain721 is ERC721, AccessControl {

    bytes32 constant public CROSS_CHAIN_RECIEVER = keccak256("CROSS_CHAIN_RECIEVER");

    constructor(
        string memory _name,
        string memory _symbol,
        address crossChainReciever
    ) ERC721(_name, _symbol) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(CROSS_CHAIN_RECIEVER, crossChainReciever);
    }

    function mintTo(address to, uint256 tokenId) external onlyRole(CROSS_CHAIN_RECIEVER) {
        _mint(to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

}
