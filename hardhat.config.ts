import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "solidity-coverage";
import dotenv from "dotenv";

// import "./tasks/ima_registration";

dotenv.config();

const PRIVATE_KEY: string | undefined = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) {
    throw new Error("Private Key Not Set in .env");
}

const config: HardhatUserConfig = {
    solidity: "0.8.19",
    namedAccounts: {
        deployer: 0 
    },
    networks: {
        "calypso-testnet": {
            url: "https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar",
            accounts: [PRIVATE_KEY],
        },
        "chaos-testnet": {
            url: "https://staging-v3.skalenodes.com/v1/staging-fast-active-bellatrix",
            accounts: [PRIVATE_KEY],
        },
        "europa-testnet": {
            url: "https://staging-v3.skalenodes.com/v1/staging-legal-crazy-castor",
            accounts: [PRIVATE_KEY],
        },
        "nebula-testnet": {
            url: "https://staging-v3.skalenodes.com/v1/staging-faint-slimy-achird",
            accounts: [PRIVATE_KEY],
        },
        "titan-testnet": {
            url: "https://staging-v3.skalenodes.com/v1/staging-aware-chief-gianfar",
            accounts: [PRIVATE_KEY],
        },
    },
    etherscan: {
        apiKey: {
            "calypso-testnet": "use-any-string-here",
            "chaos-testnet": "use-any-string-here",
            "europa-testnet": "use-any-string-here",
            "nebula-testnet": "use-any-string-here",
            "titan-testnet": "use-any-string-here",
        },
        customChains: [
            {
                network: "calypso-testnet",
                chainId:  344106930,
                urls: {
                    apiURL: "https://staging-utter-unripe-menkar.explorer.staging-v3.skalenodes.com/api",
                    browserURL: "https://staging-utter-unripe-menkar.explorer.staging-v3.skalenodes.com"
                }
            },
            {
                network: "chaos-testnet",
                chainId: 1351057110,
                urls: {
                    apiURL: "https://staging-fast-active-bellatrix.explorer.staging-v3.skalenodes.com/api",
                    browserURL: "https://staging-fast-active-bellatrix.explorer.staging-v3.skalenodes.com"
                }
            },
            {
                network: "europa-testnet",
                chainId: 476158412,
                urls: {
                    apiURL: "https://staging-legal-crazy-castor.explorer.staging-v3.skalenodes.com/api",
                    browserURL: "https://staging-legal-crazy-castor.explorer.staging-v3.skalenodes.com"
                }
            },
            {
                network: "nebula-testnet",
                chainId: 503129905,
                urls: {
                    apiURL: "https://staging-faint-slimy-achird.explorer.staging-v3.skalenodes.com/api",
                    browserURL: "https://staging-faint-slimy-achird.explorer.staging-v3.skalenodes.com"
                }
            },
            {
                network: "titan-testnet",
                chainId: 1517929550,
                urls: {
                    apiURL: "https://staging-aware-chief-gianfar.explorer.staging-v3.skalenodes.com/api",
                    browserURL: "https://staging-aware-chief-gianfar.explorer.staging-v3.skalenodes.com"
                }
            },

        ]
    }
};

export default config;
