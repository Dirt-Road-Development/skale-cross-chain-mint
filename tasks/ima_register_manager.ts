import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { registerContractSchain } from "../utils/register_contract_schain";
import chalk from "chalk";
import CONFIG from "../config/shared.json";

task("ima-register", "Register Any Contract with MessageProxyForSchain")
    .addParam("chain", "Chain Name to Register To")
    .setAction(async(args: TaskArguments, hre: HardhatRuntimeEnvironment) => {

        const { ethers, network } = hre;
        const isTesnet = network.name.includes("testnet");

        const url = (network.config as any).url;

        if (url === null || url === undefined) {
            throw new Error(chalk.redBright("error attaining url from network"));
        }

        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string).connect(new ethers.JsonRpcProvider(url));
        
        await registerContractSchain(CONFIG.MINT_MANAGER[isTestnet ? "testnet" : "mainnet"].address, args.chain, wallet);
    });