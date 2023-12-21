// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import "@skalenetwork/ima-interfaces/schain/IMessageProxyForSchain.sol";

contract MintManager is AccessControl {

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant MANAGER_RECIEVER_ROLE = keccak256("MANAGER_RECIEVER_ROLE");

    IMessageProxyForSchain public proxy;

    mapping(bytes32 => address) public crossChainRecievers;

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(MANAGER_RECIEVER_ROLE, msg.sender);

        proxy = IMessageProxyForSchain(
            0xd2AAa00100000000000000000000000000000000
        );
    }

    function setCrossChainReceiver(bytes32 chainNameHash, address newReceiverAddress) external onlyRole(MANAGER_RECIEVER_ROLE) {
        crossChainRecievers[chainNameHash] = newReceiverAddress;
        /// Emit Event
    }


    function mintTo(address to, bytes32 chainNameHash, address destinationContractAddress) external onlyRole(MINTER_ROLE) {
        proxy.postOutgoingMessage(
            chainNameHash,
            crossChainRecievers[chainNameHash],
            abi.encode(
                0x0,
                to,
                destinationContractAddress
            )
        );
    }

    function mintTo(address to, bytes32 chainNameHash, address destinationContractAddress, uint256 tokenId) external onlyRole(MINTER_ROLE) {
        proxy.postOutgoingMessage(
            chainNameHash,
            crossChainRecievers[chainNameHash],
            abi.encode(
                0x01,
                to,
                destinationContractAddress,
                tokenId
            )
        );
    }
    
    /** ERC1155 -> Specify How many **/
    function mintTo(address to, bytes32 chainNameHash, address destinationContractAddress, uint256 tokenId, uint256 amount) external onlyRole(MINTER_ROLE) {
        proxy.postOutgoingMessage(
            chainNameHash,
            crossChainRecievers[chainNameHash],
            abi.encode(
                0x02,
                to,
                destinationContractAddress,
                tokenId,
                amount
            )
        );
    }
}

    // function _beforeTokenTransfer(address from, address to, uint256 firstTokenId, uint256 batchSize) internal virtual override {
    //     if (rorrimNFTAddress == address(0)) revert RorrimAddressNotSet();
    //     super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    // }
// }

    // function _afterTokenTransfer(
    //     address from,
    //     address to,
    //     uint256 firstTokenId,
    //     uint256 batchSize
    // ) internal virtual override {
    //     super._afterTokenTransfer(from, to, firstTokenId, batchSize);
    //     if (from == address(0)) {
    //         proxy.postOutgoingMessage(
    //             destinationChainHash,
    //             rorrimNFTAddress,
    //             abi.encode(
    //                 "mint",
    //                 abi.encode(MintNotice({to: to, tokenId: firstTokenId}))
    //             )
    //         );
    //     } else {
    //         proxy.postOutgoingMessage(
    //             destinationChainHash,
    //             rorrimNFTAddress,
    //             abi.encode(
    //                 "transfer",
    //                 abi.encode(TransferNotice({to: to, tokenId: firstTokenId}))
    //             )
    //         );
    //     }
    // }
// }
