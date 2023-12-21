import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { registerContractAllSchain } from "../utils/register_contract_all_schain";
import chalk from "chalk";
import CONFIG from "../config/shared.json";

task("ima-register", "Register Any Contract with MessageProxyForSchain")
    .setAction(async(args: TaskArguments, hre: HardhatRuntimeEnvironment) => {

        const { ethers, network } = hre;
        const isTestnet = network.name.includes("testnet");

        const url = (network.config as any).url;

        if (url === null || url === undefined) {
            throw new Error(chalk.redBright("error attaining url from network"));
        }

        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string).connect(new ethers.JsonRpcProvider(url));
        
        await registerContractAllSchain(CONFIG.MINT_MANAGER[isTestnet ? "testnet" : "mainnet"].address, wallet);
    });