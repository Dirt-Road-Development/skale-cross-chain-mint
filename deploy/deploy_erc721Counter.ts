import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import ERC721_CONFIG from "../config/deploy_erc721.json";
import CONFIG from "../config/shared.json";

const func: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {

    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;

    const { deployer} = await getNamedAccounts();

    const deployed = await deploy(
        "CrossChainERC721Counter",
        {
            from: deployer,
            log: true,
            args: [
                ERC721_CONFIG.name,
                ERC721_CONFIG.symbol,
                CONFIG.CROSS_CHAIN_RECEIVER
            ]
        }
    );

    await hre.run("verify:verify", {
        address: deployed.address,
        contract: "contracts/CrossChainERC721Counter.sol:CrossChainERC721Counter"
    });
}

export default func;

func.tags = ["erc721-counter"];