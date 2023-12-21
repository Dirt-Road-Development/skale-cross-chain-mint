import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import CONFIG from "../config/shared.json";

const func: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {

    const { deployments, getNamedAccounts, network } = hre;
    const { deploy } = deployments;

    const { deployer} = await getNamedAccounts();

    const managerConfig = CONFIG.MINT_MANAGER[network.name.includes("testnet") ? "testnet" : "mainnet"];

    const deployed = await deploy(
        "CrossChainReceiver",
        {
            from: deployer,
            log: true,
            args: [
                managerConfig.chainNameHash,
                managerConfig.address
            ]
        }
    );

    await hre.run("verify:verify", {
        address: deployed.address,
        contract: "contracts/CrossChainReceiver.sol:CrossChainReceiver",
        constructorArguments: [
            managerConfig.chainNameHash,
            managerConfig.address
        ]
    });
}

export default func;

func.tags = ["receiver"];