// File: test/Admin.js

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Admin", function () {
  let Admin;
  let admin;
  let owner;
  let addr1;

  beforeEach(async function () {
    Admin = await ethers.getContractFactory("Admin");
    [owner, addr1] = await ethers.getSigners();
    admin = await Admin.deploy();
    await admin.deployed();
  });

  describe("Check Admin", function () {
    it("Should return true when checking owner address", async function () {
      expect(await admin.connect(owner).checkAdmin(owner.address)).to.equal(true);
    });

    it("Should return false when checking a non-owner address", async function () {
      expect(await admin.connect(owner).checkAdmin(addr1.address)).to.equal(false);
    });
  });
});
