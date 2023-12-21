import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;

    const { deployer } = await getNamedAccounts();

    const deployed = await deploy(
        "MintManager",
        {
            from: deployer,
            log: true
        }
    );

    await hre.run("verify:verify", {
        address: deployed.address,
        contract: "contracts/MintManager.sol:MintManager"
    });
}

export default func;

func.tags = ["manager"];