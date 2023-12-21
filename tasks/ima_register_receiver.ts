import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { registerContractSchain } from "../utils/register_contract_schain";
import chalk from "chalk";
import CONFIG from "../config/shared.json";

task("ima-register", "Register Any Contract with MessageProxyForSchain")
    .addOptionalParam("address", "Address to Register. Defaults to address from active chain")
    .addOptionalParam("chain", "Chain Name Where Manager is Located, Defaults to MINT_MANAGER in /config/shared.json")
    .setAction(async(args: TaskArguments, hre: HardhatRuntimeEnvironment) => {

        const { ethers, network, deployments } = hre;
        const isTesnet = network.name.includes("testnet");

        let contractRecieverAddress = args.address;
        let chain = args.chain;

        if (contractRecieverAddress === null || contractRecieverAddress === undefined) {
            const deployment = await deployments.getOrNull("CrossChainReceiver");
            if (deployment === null) {
                throw new Error("No Contract Deployment Found on: ", network.name);
            }

            contractReceiverAddress = deployment.address;
        }

        if (chain === null || chain === undefined) {
            chain = CONFIG.MINT_MANAGER[isTestnet ? "testnet" : "mainnet"].chainName;
        }

        const url = (network.config as any).url;

        if (url === null || url === undefined) {
            throw new Error(chalk.redBright("error attaining url from network"));
        }

        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string).connect(new ethers.JsonRpcProvider(url));
        
        await registerContractSchain(contractRecieverAddress, chain, wallet);
    });