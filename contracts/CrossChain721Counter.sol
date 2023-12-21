// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CrossChain721 is ERC721, AccessControl {

    using Counters for Counters.Counter;

    bytes32 constant public CROSS_CHAIN_RECIEVER = keccak256("CROSS_CHAIN_RECIEVER");

    Counters.Counter public tokenIdCounter;

    constructor(
        string memory _name,
        string memory _symbol,
        address crossChainReciever
    ) ERC721(_name, _symbol) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(CROSS_CHAIN_RECIEVER, crossChainReciever);
    }

    function mintTo(address to) external onlyRole(CROSS_CHAIN_RECIEVER) {
        tokenIdCounter.increment();
        _mint(to, tokenIdCounter.current());
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
