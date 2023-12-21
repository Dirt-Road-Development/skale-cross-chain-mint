import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import ERC1155_CONFIG from "../config/deploy_erc1155.json";
import CONFIG from "../config/shared.json";

const func: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {

    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;

    const { deployer} = await getNamedAccounts();

    const deployed = await deploy(
        "CrossChainERC1155",
        {
            from: deployer,
            log: true,
            args: [
                ERC1155_CONFIG.name,
                CONFIG.CROSS_CHAIN_RECEIVER
            ]
        }
    );

    await hre.run("verify:verify", {
        address: deployed.address,
        contract: "contracts/CrossChainERC1155.sol:CrossChainERC1155"
    });
}

export default func;

func.tags = ["erc1155"];