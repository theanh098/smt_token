import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { SMToken } from "../typechain-types";

describe("SMToken contract", () => {
  let owner: SignerWithAddress,
    _addr1: SignerWithAddress,
    _addr2: SignerWithAddress,
    smToken: SMToken;

  beforeEach(async () => {
    [owner, _addr1, _addr2] = await ethers.getSigners();
    const sc = await ethers.getContractFactory("SMToken");
    smToken = await sc
      .connect(owner)
      .deploy(ethers.utils.parseEther("1000000"));
  });

  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const ownerBalance = await smToken.balanceOf(owner.address);
    expect(await smToken.totalSupply()).to.equal(ownerBalance);
  });

  it("Buy token", async function () {
    await smToken.approve(_addr1.address, ethers.utils.parseEther("1000"));

    /**
     * buy 10 SMT by 0.01 ETH
     */
    await smToken.connect(_addr1).buy({
      value: ethers.utils.parseEther("0.01"),
    });
    expect(await smToken.balanceOf(owner.address)).to.equal(
      ethers.utils.parseEther("999990")
    );
  });
});
