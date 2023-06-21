// File: test/UpdateStudent.js

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Update Student", function () {
  let Admin, Program, RegisterStudent, RequestUpdate,UpdateStudent,StudentHistory;
  let admin, program, registerStudent, requestUpdate,updateStudent,studentHistory;
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

    StudentHistory = await ethers.getContractFactory("StudentHistory");
    studentHistory = await StudentHistory.deploy();
    await studentHistory.deployed();

    
    await studentHistory.setAdminContract(admin.address);
    
    UpdateStudent = await ethers.getContractFactory("UpdateStudent");
    updateStudent = await UpdateStudent.deploy();
    await updateStudent.deployed();

    
    await updateStudent.setAdminContract(admin.address);
    await updateStudent.setRegisterStudentContract(registerStudent.address);
    await updateStudent.setRequestUpdateContract(requestUpdate.address);
    await updateStudent.setStudentHistoryContract(studentHistory.address);
  });
      it("Should successfully Approve update request", async () => {
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
      await updateStudent.connect(owner).Approval(addr1.address, true, "Update approved");
      const status = await requestUpdate.getStatus(addr1.address);
      expect(status[0]).to.equal("Approved");
    });

    it("Should successfully Reject update request", async () => {
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
        await updateStudent.connect(owner).Approval(addr1.address, false, "Request Rejected");
        const status = await requestUpdate.getStatus(addr1.address);
        expect(status[0]).to.equal("Rejected");
      });

      it("Should not allow non-admin to Approve update request", async () => {
       await expect(updateStudent.connect(addr2).Approval(addr1.address, true, "Update approved")).to.be.revertedWith("You are not Admin");
      });
});
