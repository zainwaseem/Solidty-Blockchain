const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RegisterStudent", function () {
    let Admin, Program, RegisterStudent;
    let admin, program, registerStudent;
    let owner, addr1, addr2;

    beforeEach(async function () {

        Admin = await ethers.getContractFactory("Admin");
        [owner, addr1, addr2] = await ethers.getSigners();
        admin = await Admin.deploy();
        await admin.deployed();

        Program = await ethers.getContractFactory("Program");
        program = await Program.deploy();
        await program.deployed();

        await program.setAdminContract(admin.address);
        RegisterStudent = await ethers.getContractFactory("RegisterStudent");
        registerStudent = await RegisterStudent.deploy();
        await registerStudent.deployed();

        await registerStudent.setAdminContract(admin.address);
        await registerStudent.setProgramContract(program.address);
    });

    describe("Add Student", function () {
        it("Should add a student successfully", async function () {
            await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
            await registerStudent.connect(owner).add_student("REG01", addr1.address, "P1");
            const student = await registerStudent.get_student(addr1.address);
            expect(student.Id).to.equal("REG01");
            expect(student.addr).to.equal(addr1.address);
            expect(student.programCode).to.equal("P1");
        });

        it("Should not add a student by a non-admin address", async function () {
            await expect(registerStudent.connect(addr1).add_student("REG02", addr2.address, "PROG01")).to.be.revertedWith("You are not Admin");
        });

        it("Should not add a student that is already registered", async function () {
            const tx = await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
            await tx.wait();
            await registerStudent.connect(owner).add_student("REG01", addr1.address, "P1");
            await expect(registerStudent.connect(owner).add_student("REG02", addr1.address, "PROG01")).to.be.revertedWith("Student is already registered");
        });

        it("Should not add a student with the same registration Id", async function () {
            const tx = await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
            await tx.wait();
            await registerStudent.connect(owner).add_student("REG01", addr1.address, "P1");
            await expect(registerStudent.connect(owner).add_student("REG01", addr2.address, "PROG01")).to.be.revertedWith("Invalid registration Id");
        });

        it("Should not add a student if the program is not registered", async function () {
            await expect(registerStudent.connect(owner).add_student("REG01", addr1.address, "PROG02")).to.be.revertedWith("Program is not registered");
        });
    });

    describe("Check Student", function () {
        it("Should return true for a registered student", async function () {
            await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
            await registerStudent.connect(owner).add_student("REG01", addr1.address, "P1");
            await registerStudent.connect(addr1).PersonalDetails("John", "Doe", "2000-01-01", "CNIC01", "Male", "Domicile01", "Country01", "Address01", "email@example.com", "123456789");
            await registerStudent.connect(addr1).FatherDetails("Tom", "CNIC02", "Engineer", "50000", "987654321");
            await registerStudent.connect(addr1).EducationalDetails("Board01", 1000, 800, "Board02", 1100, 900);
            await registerStudent.connect(addr1).DocumentDetails("pic.jpg", "CNIC01", "SSC01", "HSSC01");
            const exists = await registerStudent.checkStudent(addr1.address);
            expect(exists).to.be.true;
        });

        it("Should return false for a non-registered student", async function () {
            const exists = await registerStudent.checkStudent(addr1.address);
            expect(exists).to.be.false;
        });
    });

    describe("Get Student Data", function () {
        it("Should return an empty student object for a non-registered student", async function () {
            const student = await registerStudent.get_student(addr1.address);
            expect(student.isCreated).to.be.false;
        });

        it("Should return the correct student object for a registered student", async function () {
            await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
            await registerStudent.connect(owner).add_student("REG01", addr1.address, "P1");
            const student = await registerStudent.get_student(addr1.address);
            expect(student.addr).to.equal(addr1.address);
            expect(student.Id).to.equal("REG01");
            expect(student.programCode).to.equal("P1");
            expect(student.isCreated).to.be.true;
        });
    });
    describe("Personal Details", function () {
        it("Should add personal details by a registered student", async function () {
            await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
            await registerStudent.connect(owner).add_student("REG01", addr1.address, "P1");
            await registerStudent.connect(addr1).PersonalDetails("John", "Doe", "2000-01-01", "CNIC01", "Male", "Domicile01", "Country01", "Address01", "email@example.com", "123456789");
            const student = await registerStudent.get_student(addr1.address);
            expect(student.s_data.name).to.equal("John");
        });

        it("Should not add personal details by a non-registered student", async function () {
            await expect(registerStudent.connect(addr1).PersonalDetails("John", "Doe", "2000-01-01", "CNIC01", "Male", "Domicile01", "Country01", "Address01", "email@example.com", "123456789")).to.be.revertedWith("Invalid metamask account");
        });
    });

    describe("Father Details", function () {
        it("Should add father details by a registered student", async function () {
            await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
            await registerStudent.connect(owner).add_student("REG01", addr1.address, "P1");
            await registerStudent.connect(addr1).FatherDetails("Tom", "CNIC02", "Engineer", "50000", "987654321");
            const student = await registerStudent.get_student(addr1.address);
            expect(student.f_data.name).to.equal("Tom");
        });

        it("Should not add father details by a non-registered student", async function () {
            await expect(registerStudent.connect(addr1).FatherDetails("Tom", "CNIC02", "Engineer", "50000", "987654321")).to.be.revertedWith("Invalid metamask account");
        });
    });

    describe("Educational Details", function () {
        it("Should add educational details by a registered student", async function () {
            await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
            await registerStudent.connect(owner).add_student("REG01", addr1.address, "P1");
            await registerStudent.connect(addr1).EducationalDetails("Board01", 1000, 800, "Board02", 1100, 900);
            const student = await registerStudent.get_student(addr1.address);
            expect(student.e_data.ssc_board_name).to.equal("Board01");
        });

        it("Should not add educational details by a non-registered student", async function () {
            await expect(registerStudent.connect(addr1).EducationalDetails("Board01", 1000, 800, "Board02", 1100, 900)).to.be.revertedWith("Invalid metamask account");
        });
    });

    describe("Document Details", function () {
        it("Should add document details by a registered student", async function () {
            await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
            await registerStudent.connect(owner).add_student("REG01", addr1.address, "P1");
            await registerStudent.connect(addr1).DocumentDetails("pic.jpg", "CNIC01", "SSC01", "HSSC01");
            const student = await registerStudent.get_student(addr1.address);
            expect(student.d_data.picture).to.equal("pic.jpg");
        });

        it("Should not add document details by a non-registered student", async function () {
            await expect(registerStudent.connect(addr1).DocumentDetails("pic.jpg", "CNIC01", "SSC01", "HSSC01")).to.be.revertedWith("Invalid metamask account");
        });
    });

    describe("View Students List", function () {
        it("Should return a students list with added students", async function () {
            await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
            await registerStudent.connect(owner).add_student("REG01", addr1.address, "P1");
            await registerStudent.connect(owner).add_student("REG02", addr2.address, "P1");
            await registerStudent.connect(addr1).PersonalDetails("John", "Doe", "2000-01-01", "CNIC01", "Male", "Domicile01", "Country01", "Address01", "email@example.com", "123456789");
            await registerStudent.connect(addr1).FatherDetails("Tom", "CNIC02", "Engineer", "50000", "987654321");
            await registerStudent.connect(addr1).EducationalDetails("Board01", 1000, 800, "Board02", 1100, 900);
            await registerStudent.connect(addr1).DocumentDetails("pic.jpg", "CNIC01", "SSC01", "HSSC01");
            await registerStudent.connect(addr2).PersonalDetails("John", "Doe", "2000-01-01", "CNIC01", "Male", "Domicile01", "Country01", "Address01", "email@example.com", "123456789");
            await registerStudent.connect(addr2).FatherDetails("Tom", "CNIC02", "Engineer", "50000", "987654321");
            await registerStudent.connect(addr2).EducationalDetails("Board01", 1000, 800, "Board02", 1100, 900);
            await registerStudent.connect(addr2).DocumentDetails("pic.jpg", "CNIC01", "SSC01", "HSSC01");
            const studentsList = await registerStudent.connect(owner).getStudentsList();
            expect(studentsList.length).to.equal(2);
            expect(studentsList[0].addr).to.equal(addr1.address);
            expect(studentsList[1].addr).to.equal(addr2.address);
        });

        it("Should not allow non-admin to get Students List", async function () {
            await expect(registerStudent.connect(addr1).getStudentsList()).to.be.revertedWith("You are not Admin");
        });
    });


});
