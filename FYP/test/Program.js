// File: test/Program.js

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Program", function () {
    let Admin, Program;
    let admin, program;
    let owner, addr;

    beforeEach(async function () {

        Admin = await ethers.getContractFactory("Admin");
        [owner, addr] = await ethers.getSigners();
        admin = await Admin.deploy();
        await admin.deployed();

        Program = await ethers.getContractFactory("Program");
        program = await Program.deploy();
        await program.deployed();

        await program.setAdminContract(admin.address);
    });
    describe("Add Program", function () {
        it("Should add a program successfully", async function () {
            const tx = await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
            await tx.wait();
            const prog = await program.allprograms(0);
            expect(prog.programCode).to.equal("P1");
            expect(prog.programName).to.equal("Program 1");
            expect(prog.programShortForm).to.equal("P1SF");
            expect(prog.programType).to.equal("ProgramType1");
        });

        it("Should not allow non-admin to add a program", async function () {
            await expect(
                program.connect(addr).addProgram("P1", "Program 1", "P1SF", "ProgramType1")
            ).to.be.revertedWith("You are not Admin");
        });

        it("Should not add a program which is already registered", async function () {
            await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
            await expect(
                program.connect(owner).addProgram("P1", "Program 1 Updated", "P1SF", "ProgramType1")
            ).to.be.revertedWith("Program already registered");
        });
    });

    describe("Edit Program", function () {
        it("Should edit a program successfully", async function () {
            await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
            const tx = await program.connect(owner).editProgram("P1", "P2", "Program 2", "P2SF", "ProgramType2");
            await tx.wait();
            const prog = await program.allprograms(0);
            expect(prog.programCode).to.equal("P2");
            expect(prog.programName).to.equal("Program 2");
            expect(prog.programShortForm).to.equal("P2SF");
            expect(prog.programType).to.equal("ProgramType2");
        });

        it("Should not allow non-admin to edit a program", async function () {
            await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
            await expect(
                program.connect(addr).editProgram("P1", "P2", "Program 2", "P2SF", "ProgramType2")
            ).to.be.revertedWith("You are not Admin");
        });

        it("Should not edit a program if the previous program code is invalid", async function () {
            await expect(
                program.connect(owner).editProgram("InvalidCode", "P2", "Program 2", "P2SF", "ProgramType2")
            ).to.be.revertedWith("Invalid program code");
        });

        it("Should not edit a program if the new program code is already registered", async function () {
            await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
            await program.connect(owner).addProgram("P2", "Program 2", "P2SF", "ProgramType2");
            await expect(
                program.connect(owner).editProgram("P1", "P2", "Program 2 Updated", "P2SF", "ProgramType2")
            ).to.be.revertedWith("Program already registered with this code");
        });
    });

    describe("Delete Program", function () {
        it("Should delete a program successfully", async function () {
            await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
            const tx = await program.connect(owner).deleteProgram("P1");
            await tx.wait();
            const allPrograms = await program.getProgramList();
            expect(allPrograms.length).to.equal(0);
        });

        it("Should not allow non-admin to delete a program", async function () {
            await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
            await expect(
                program.connect(addr).deleteProgram("P1")
            ).to.be.revertedWith("You are not Admin");
        });

        it("Should not delete a program that was not added", async function () {
            await expect(
                program.connect(owner).deleteProgram("P1")
            ).to.be.revertedWith("Invalid program code");
        });
    });

    describe("View Programs", function () {
        it("Should get the list of programs", async function () {
            await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
            await program.connect(owner).addProgram("P2", "Program 2", "P2SF", "ProgramType2");
            const allPrograms = await program.getProgramList();
            expect(allPrograms.length).to.equal(2);
        });

        it("Should not allow non-admin to get the list of programs", async function () {
            await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
            await program.connect(owner).addProgram("P2", "Program 2", "P2SF", "ProgramType2");
            await expect(
                program.connect(addr).getProgramList()
            ).to.be.revertedWith("You are not Admin");
        });
    });
});