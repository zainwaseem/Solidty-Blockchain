// File: test/ScheduleAdmissions.js

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ScheduleAdmissions", function () {
    let Admin, ScheduleAdmissions;
    let admin, scheduleAdmissions;
    let owner, addr1;

    beforeEach(async function () {
        Admin = await ethers.getContractFactory("Admin");
        [owner, addr] = await ethers.getSigners();
        admin = await Admin.deploy();
        await admin.deployed();

        ScheduleAdmissions = await ethers.getContractFactory("ScheduleAdmissions");
        scheduleAdmissions = await ScheduleAdmissions.deploy();
        await scheduleAdmissions.deployed();

        await scheduleAdmissions.setAdminContract(admin.address);
    });

    describe("Schedule Admission Dates", function () {
        it("Should schedule admissions successfully", async function () {
            await scheduleAdmissions.connect(owner).scheduleAdmission(10, 20);
            const [open, close] = await scheduleAdmissions.getAdmissionDates();
            expect(open).to.equal(10);
            expect(close).to.equal(20);
        });

        it("Should fail to schedule admissions when called by a non-admin", async function () {
            await expect(scheduleAdmissions.connect(addr).scheduleAdmission(10, 20)).to.be.revertedWith("You are not Admin");
        });

        it("Should reschedule admissions successfully", async function () {
            await scheduleAdmissions.connect(owner).scheduleAdmission(10, 20);
            await scheduleAdmissions.connect(owner).scheduleAdmission(20, 30);
            const [open, close] = await scheduleAdmissions.getAdmissionDates();
            expect(open).to.equal(20);
            expect(close).to.equal(30);
        });

        it("Should get admission dates", async function () {
            await scheduleAdmissions.connect(owner).scheduleAdmission(10, 20);
            const [open, close] = await scheduleAdmissions.connect(addr).getAdmissionDates();
            expect(open).to.equal(10);
            expect(close).to.equal(20);
        });
    });


    describe("Extend Closing Date", function () {
        it("Should extend admissions date successfully", async function () {
            await scheduleAdmissions.connect(owner).scheduleAdmission(10, 20);
            await scheduleAdmissions.connect(owner).extendAdmissionDate(30);
            const [, close] = await scheduleAdmissions.getAdmissionDates();
            expect(close).to.equal(30);
        });

        it("Should fail to extend admissions date when called by a non-admin", async function () {
            await scheduleAdmissions.connect(owner).scheduleAdmission(10, 20);
            await expect(scheduleAdmissions.connect(addr).extendAdmissionDate(30)).to.be.revertedWith("You are not Admin");
        });

        it("Should fail to extend admissions date when admissions are not scheduled", async function () {
            await expect(scheduleAdmissions.connect(owner).extendAdmissionDate(30)).to.be.revertedWith("Admissions are not scheduled");
        });

    });
});
