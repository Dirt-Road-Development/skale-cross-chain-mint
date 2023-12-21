// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ICrossChain } from "./interfaces/ICrossChain.sol";

error InvalidAction();
error InvalidFromChain();
error InvalidSender();

contract CrossChainReceiver {

    // Default Message Proxy
    address public messageProxy;

    // Contract Address of Manager Contract
    address public managerContractAddress;

    // Chain Name Hash Where Manager Located
    bytes32 public managerSchainHash;

    modifier onlyMessageProxy() {
        require(msg.sender == address(messageProxy), "Sender is not a MessageProxy");
        _;
    }

    constructor(
        bytes32 _managerSchainHash,
        address _managerContractAddress
    ) {
        managerSchainHash = _managerSchainHash;
        managerContractAddress = _managerContractAddress;
        messageProxy = 0xd2AAa00100000000000000000000000000000000;
    }

    function postMessage(
        bytes32 fromSchainHash,
        address sender,
        bytes calldata data
    ) 
        external
        onlyMessageProxy
    {   

        if (fromSchainHash != managerSchainHash) revert InvalidFromChain();
        if (sender != managerContractAddress) revert InvalidSender();

        bytes1 action = abi.decode(
            data,
            (bytes1)
        );

        if (action == 0x0) {
            (,address to, address destinationContractAddress) = abi.decode(data, (bytes1, address, address));
            ICrossChain(destinationContractAddress).mintTo(to);
        } else if (action == 0x01) {
            (,address to, address destinationContractAddress, uint256 tokenId) = abi.decode(data, (bytes1, address, address, uint256));
            ICrossChain(destinationContractAddress).mintTo(to, tokenId);
        } else if (action == 0x02) {
            (, address to, address destinationContractAddress, uint256 tokenId, uint256 amount) = abi.decode(data, (bytes1, address, address, uint256, uint256));
            ICrossChain(destinationContractAddress).mintTo(to, tokenId, amount);
        } else {
           revert InvalidAction(); 
        }
    }
}
