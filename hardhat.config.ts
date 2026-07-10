import { configVariable, defineConfig, task } from "hardhat/config";
import hardhatToolboxMochaEthers from "@nomicfoundation/hardhat-toolbox-mocha-ethers";
import hardhatUpgrades from "@openzeppelin/hardhat-upgrades";

const accounts = task("accounts", "Print the accounts")
  .setInlineAction(async (_taskArgs, hre) => {
    const { ethers } = await hre.network.create();
    const signers = await ethers.getSigners();
    for (const signer of signers) {
      console.log(signer.address);
    }
  })
  .build();

export default defineConfig({
  plugins: [hardhatToolboxMochaEthers, hardhatUpgrades],

  tasks: [accounts],

  networks: {
    default: {
      type: "edr-simulated",
    },
    sepolia: {
      type: "http",
      chainType: "l1",
      url: "https://ethereum-sepolia-rpc.publicnode.com",
      accounts: [configVariable("TESTNET_PRIVATE_KEY")],
    },
    ethereum: {
      type: "http",
      chainType: "l1",
      url: "https://ethereum-mainnet-rpc.publicnode.com",
      accounts: [configVariable("MAINNET_PRIVATE_KEY")],
    },
  },

  solidity: {
    compilers: [
      {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
          viaIR: true,
        },
      },
    ],
  },

  verify: {
    etherscan: {
      apiKey: configVariable("ETHERSCAN_API"),
    },
  },

  test: {
    mocha: {
      timeout: 40000,
    },
    solidity: {
      fuzz: {
        runs: 4,
      },
      invariant: {
        runs: 4,
        depth: 4,
        failOnRevert: true,
      },
    },
  },
});
