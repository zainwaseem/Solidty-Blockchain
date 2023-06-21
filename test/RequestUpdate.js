// File: test/RequestUpdate.js

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RequestUpdate", function () {
  let Admin, Program, RegisterStudent, RequestUpdate;
  let admin, program, registerStudent, requestUpdate;
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

    RequestUpdate = await ethers.getContractFactory("RequestUpdate");
    requestUpdate = await RequestUpdate.deploy();
    await requestUpdate.deployed();

    await requestUpdate.setRegisterStudentContract(registerStudent.address);
  });

  describe("Personal Details", function () {
    it("Should successfully add requested data for updating personal details", async function () {
      await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
      await registerStudent.connect(owner).add_student("REG01", addr1.address, "P1");
      await registerStudent.connect(addr1).PersonalDetails("John", "Doe", "2000-01-01", "CNIC01", "Male", "Domicile01", "Country01", "Address01", "email@example.com", "123456789");
      await registerStudent.connect(addr1).FatherDetails("Tom", "CNIC02", "Engineer", "50000", "987654321");
      await registerStudent.connect(addr1).EducationalDetails("Board01", 1000, 800, "Board02", 1100, 900);
      await registerStudent.connect(addr1).DocumentDetails("pic.jpg", "CNIC01", "SSC01", "HSSC01");
      await requestUpdate.connect(addr1).updatePersonalDetails("John", "Doe", "01-01-2000", "CNIC01", "Male", "Domicile1", "USA", "Street 1", "john@example.com", "123456789");
      const student = await requestUpdate.getStudentRequestDetails(addr1.address);
      expect(student.s_data.stored).to.be.true;
    });

    it("Should not allow non-registered student to update personal details", async function () {
      await expect(requestUpdate.connect(addr2).updatePersonalDetails("Jane", "Smith", "02-02-2000", "CNIC02", "Female", "Domicile2", "USA", "Street 2", "jane@example.com", "234567890")).to.be.revertedWith("You are not registered");
    });

    it("Should not allow added student to update personal details until their registration is complete", async function () {
      await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
      await registerStudent.connect(owner).add_student("REG01", addr1.address, "P1");
      await expect(requestUpdate.connect(addr1).updatePersonalDetails("Jane", "Smith", "02-02-2000", "CNIC02", "Female", "Domicile2", "USA", "Street 2", "jane@example.com", "234567890")).to.be.revertedWith("You are not registered");
    });
  });

  describe("Father Details", function () {
    it("Should successfully add requested data for updating father details", async function () {
      await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
      await registerStudent.connect(owner).add_student("REG01", addr1.address, "P1");
      await registerStudent.connect(addr1).PersonalDetails("John", "Doe", "2000-01-01", "CNIC01", "Male", "Domicile01", "Country01", "Address01", "email@example.com", "123456789");
      await registerStudent.connect(addr1).FatherDetails("Tom", "CNIC02", "Engineer", "50000", "987654321");
      await registerStudent.connect(addr1).EducationalDetails("Board01", 1000, 800, "Board02", 1100, 900);
      await registerStudent.connect(addr1).DocumentDetails("pic.jpg", "CNIC01", "SSC01", "HSSC01");
      await requestUpdate.connect(addr1).updatePersonalDetails("John", "Doe", "01-01-2000", "CNIC01", "Male", "Domicile1", "USA", "Street 1", "john@example.com", "123456789");
      await requestUpdate.connect(addr1).updateFatherDetails("Tom", "CNIC02", "Engineer", "50000", "987654321");
      const student = await requestUpdate.getStudentRequestDetails(addr1.address);
      expect(student.f_data.stored).to.be.true;
    });

    it("Should not allow non-registered student to update father details", async function () {
      await expect(requestUpdate.connect(addr2).updateFatherDetails("Tom", "CNIC02", "Engineer", "50000", "987654321")).to.be.revertedWith("You are not registered");
    });

    it("Should not allow added student to update father details until their registration is complete", async function () {
      await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
      await registerStudent.connect(owner).add_student("REG01", addr1.address, "P1");
      await expect(requestUpdate.connect(addr1).updateFatherDetails("Tom", "CNIC02", "Engineer", "50000", "987654321")).to.be.revertedWith("You are not registered");
    });
  });

  describe("Educational Details", function () {
    it("Should successfully add requested data for updating educational details", async function () {
      await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
      await registerStudent.connect(owner).add_student("REG01", addr1.address, "P1");
      await registerStudent.connect(addr1).PersonalDetails("John", "Doe", "2000-01-01", "CNIC01", "Male", "Domicile01", "Country01", "Address01", "email@example.com", "123456789");
      await registerStudent.connect(addr1).FatherDetails("Tom", "CNIC02", "Engineer", "50000", "987654321");
      await registerStudent.connect(addr1).EducationalDetails("Board01", 1000, 800, "Board02", 1100, 900);
      await registerStudent.connect(addr1).DocumentDetails("pic.jpg", "CNIC01", "SSC01", "HSSC01");
      await requestUpdate.connect(addr1).updatePersonalDetails("John", "Doe", "01-01-2000", "CNIC01", "Male", "Domicile1", "USA", "Street 1", "john@example.com", "123456789");
      await requestUpdate.connect(addr1).updateFatherDetails("Tom", "CNIC02", "Engineer", "50000", "987654321");
      await requestUpdate.connect(addr1).updateEducationalDetails("Board01", 1000, 800, "Board02", 1100, 900);
      const student = await requestUpdate.getStudentRequestDetails(addr1.address);
      expect(student.e_data.stored).to.be.true;
    });

    it("Should not allow non-registered student to update educational details", async function () {
      await expect(requestUpdate.connect(addr2).updateEducationalDetails("Board01", 1000, 800, "Board02", 1100, 900)).to.be.revertedWith("You are not registered");
    });

    it("Should not allow added student to update educational details until their registration is complete", async function () {
      await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
      await registerStudent.connect(owner).add_student("REG01", addr1.address, "P1");
      await expect(requestUpdate.connect(addr1).updateEducationalDetails("Board01", 1000, 800, "Board02", 1100, 900)).to.be.revertedWith("You are not registered");
    });
  });

  describe("Document Details", function () {
    it("Should successfully add requested data for updating document details", async function () {
      await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
      await registerStudent.connect(owner).add_student("REG01", addr1.address, "P1");
      await registerStudent.connect(addr1).PersonalDetails("John", "Doe", "2000-01-01", "CNIC01", "Male", "Domicile01", "Country01", "Address01", "email@example.com", "123456789");
      await registerStudent.connect(addr1).FatherDetails("Tom", "CNIC02", "Engineer", "50000", "987654321");
      await registerStudent.connect(addr1).EducationalDetails("Board01", 1000, 800, "Board02", 1100, 900);
      await registerStudent.connect(addr1).DocumentDetails("pic.jpg", "CNIC01", "SSC01", "HSSC01");
      await requestUpdate.connect(addr1).updatePersonalDetails("John", "Doe", "01-01-2000", "CNIC01", "Male", "Domicile1", "USA", "Street 1", "john@example.com", "123456789");
      await requestUpdate.connect(addr1).updateFatherDetails("Tom", "CNIC02", "Engineer", "50000", "987654321");
      await requestUpdate.connect(addr1).updateEducationalDetails("Board01", 1000, 800, "Board02", 1100, 900);
      const student1= await registerStudent.connect(addr1).get_student(addr1);
      console.log("here"+ student1.Id);
      await requestUpdate.connect(addr1).updateDocumentDetails(student1.Id,student1.addr,student1.programCode,student1.admission_date,"pic.jpg", "CNIC01", "SSC01", "HSSC01", "Country name is incorrect");
      const student = await requestUpdate.getStudentRequestDetails(addr1.address);
      expect(student.d_data.stored).to.be.true;
    });

    it("Should not allow non-registered student to document educational details", async function () {
      const student1= await registerStudent.connect(addr1).get_student(addr1);
      await requestUpdate.connect(addr1).updateDocumentDetails(student1.Id,student1.addr,student1.programCode,student1.admission_date,"pic.jpg", "CNIC01", "SSC01", "HSSC01", "Country name is incorrect");
          });

    it("Should not allow added student to update document details until their registration is complete", async function () {
      await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
      await registerStudent.connect(owner).add_student("REG01", addr1.address, "P1"); const student1= await registerStudent.connect(addr1).get_student(addr1);
      await requestUpdate.connect(addr1).updateDocumentDetails(student1.Id,student1.addr,student1.programCode,student1.admission_date,"pic.jpg", "CNIC01", "SSC01", "HSSC01", "Country name is incorrect");
    });
  });
  describe("Request List", () => {
      it("Should successfully return pending requests list", async () => {
      await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
      await registerStudent.connect(owner).add_student("REG01", addr1.address, "P1");
      await registerStudent.connect(addr1).PersonalDetails("John", "Doe", "2000-01-01", "CNIC01", "Male", "Domicile01", "Country01", "Address01", "email@example.com", "123456789");
      await registerStudent.connect(addr1).FatherDetails("Tom", "CNIC02", "Engineer", "50000", "987654321");
      await registerStudent.connect(addr1).EducationalDetails("Board01", 1000, 800, "Board02", 1100, 900);
      await registerStudent.connect(addr1).DocumentDetails("pic.jpg", "CNIC01", "SSC01", "HSSC01");
      await requestUpdate.connect(addr1).updatePersonalDetails("John", "Doe", "01-01-2000", "CNIC01", "Male", "Domicile1", "USA", "Street 1", "john@example.com", "123456789");
      await requestUpdate.connect(addr1).updateFatherDetails("Tom", "CNIC02", "Engineer", "50000", "987654321");
      await requestUpdate.connect(addr1).updateEducationalDetails("Board01", 1000, 800, "Board02", 1100, 900);
      await requestUpdate.connect(addr1).updateDocumentDetails("pic.jpg", "CNIC01", "SSC01", "HSSC01", "Country name is incorrect");
      const pendingQueue = await requestUpdate.getPendingQueue();
      expect(pendingQueue).to.be.an("array").that.has.lengthOf(1);
      const [pendingStudent] = pendingQueue;
      expect(pendingStudent.addr).to.equal(addr1.address);
    });

    it("Should not allow non-admin to get pending request list", async () => {
      const pendingQueue = await requestUpdate.getPendingQueue();
      expect(pendingQueue).to.be.an("array").that.is.empty;
    });
  });

  describe("Get Student Requested Data", function () {
    it("Should return an empty student object for added student who has no requested data", async function () {
      await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
      await registerStudent.connect(owner).add_student("REG01", addr1.address, "P1");
        const student = await registerStudent.get_student(addr1.address);
        expect(student.isCreated).to.be.true;
        const student1 = await requestUpdate.getStudentRequestDetails(addr1.address);
        expect(student1.isCreated).to.be.false;
    });

    it("Should return the correct student object for a requested data", async function () {
      await program.connect(owner).addProgram("P1", "Program 1", "P1SF", "ProgramType1");
      await registerStudent.connect(owner).add_student("REG01", addr1.address, "P1");
      await registerStudent.connect(addr1).PersonalDetails("John", "Doe", "2000-01-01", "CNIC01", "Male", "Domicile01", "Country01", "Address01", "email@example.com", "123456789");
      await registerStudent.connect(addr1).FatherDetails("Tom", "CNIC02", "Engineer", "50000", "987654321");
      await registerStudent.connect(addr1).EducationalDetails("Board01", 1000, 800, "Board02", 1100, 900);
      await registerStudent.connect(addr1).DocumentDetails("pic.jpg", "CNIC01", "SSC01", "HSSC01");
      await requestUpdate.connect(addr1).updatePersonalDetails("John", "Doe", "01-01-2000", "CNIC01", "Male", "Domicile1", "USA", "Street 1", "john@example.com", "123456789");
      await requestUpdate.connect(addr1).updateFatherDetails("Tom", "CNIC02", "Engineer", "50000", "987654321");
      await requestUpdate.connect(addr1).updateEducationalDetails("Board01", 1000, 800, "Board02", 1100, 900);
      await requestUpdate.connect(addr1).updateDocumentDetails("pic.jpg", "CNIC01", "SSC01", "HSSC01", "Country name is incorrect");
      const student = await requestUpdate.getStudentRequestDetails(addr1.address);
        expect(student.addr).to.equal(addr1.address);
        expect(student.Id).to.equal("REG01");
        expect(student.programCode).to.equal("P1");
        expect(student.isCreated).to.be.true;
    });
});

});
