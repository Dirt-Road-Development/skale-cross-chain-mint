# SKALE Cross Chain Mint Example

The following repository is a great example on how to use messages from one SKALE Chain (or Mainnet) and mint assets on another.

## Installation

Run `npm install` in the root of the directory after forking/cloning.

## Deployment (Launch)

To deploy the base protocol you must do the following:

1. Add a private key without the 0x to a .env file `cp .env.example .env && vim .env`
2. Make sure your Ethereum account has deployer role on the necessary chains

Once complete, run the following to launch the protocol:

```shell
// Deploy ERC-721
npx hardhat deploy --network <network-name> --tags erc721

// Deploy ERC-1155
npx hardhat launch --network <network-name> --tags erc1155

// Deploy ERC-721 with Counter
npx hardhat launch --network <network-name> --tags erc721-counter

// Deploy Cross Chain Receiver
npx hardhat launch --network <network-name> --tags receiver

// Deploy Mint Manager
npx hardhat launch --network <network-name> --tags manager
```

### Security and Liability

All contracts, code, examples, test are WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

### License

See [License](./LICENSE) in License.
