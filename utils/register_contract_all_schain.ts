import IMA from "../config/ima.json";
import chalk from "chalk";
import { ethers } from "ethers";

const EXTRA_CONTRACT_REGISTRAR_ROLE = ethers.id("EXTRA_CONTRACT_REGISTRAR_ROLE");

export async function registerContractAllSchain(
    contractAddress: string,
    signer: ethers.Wallet
) {
    
    const messageProxyForSchain = new ethers.Contract(IMA["message_proxy_chain_address"], IMA["message_proxy_chain_abi"], signer);
    
    const hasRole: boolean = await messageProxyForSchain.hasRole(EXTRA_CONTRACT_REGISTRAR_ROLE, signer.address);
    if (!hasRole) throw new Error(chalk.redBright("You need EXTRA_CONTRACT_REGISTRAR_ROLE"));

    try {
        const res = await messageProxyForSchain.registerExtraContractForAll(ethers.getAddress(contractAddress));
        chalk.green(res);
    } catch (err) {
        throw new Error(chalk.redBright(err));
    }
}