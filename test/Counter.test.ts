import { expect } from "chai";
import hre from "hardhat";
import type { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/types";
import type { Counter } from "../types/ethers-contracts/index.js";

describe("Counter", function () {
  let deployer: HardhatEthersSigner,
    admin: HardhatEthersSigner,
    addr1: HardhatEthersSigner,
    addr2: HardhatEthersSigner,
    addr3: HardhatEthersSigner,
    addr4: HardhatEthersSigner,
    addr5: HardhatEthersSigner,
    addr6: HardhatEthersSigner,
    addr7: HardhatEthersSigner,
    addr8: HardhatEthersSigner,
    addr9: HardhatEthersSigner;

  let counter: Counter;

  const deploy = async () => {
    const { ethers } = await hre.network.getOrCreate();
    [deployer, admin, addr1, addr2, addr3, addr4, addr5, addr6, addr7, addr8, addr9] = await ethers.getSigners();
    counter = await (await ethers.getContractFactory("Counter")).deploy();
  };

  before(async () => {
    console.log("Deploying Counter contract...");
    await deploy();
  });

  describe("Deployment", function () {
    it("Should set the initial count to 0", async function () {
      const count = await counter.getCount();
      expect(count).to.equal(0n);
    });
  });

  describe("Increment", function () {
    it("Should increment the count by 1", async function () {
      const tx = await counter.increment();
      await tx.wait();

      const count = await counter.getCount();
      expect(count).to.equal(1n);
    });
  });
});
