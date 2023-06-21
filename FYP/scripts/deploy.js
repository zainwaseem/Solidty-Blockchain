const hre = require("hardhat");
const { ethers } = require("hardhat");


async function main() {
  const Admin = await hre.ethers.getContractFactory("Admin");
  const admin = await Admin.deploy();
  await admin.deployed();
  console.log(`Admin: "${admin.address}",`);

    const Program = await hre.ethers.getContractFactory("Program");
    const program = await Program.deploy();
    await program.deployed();
    console.log(`Program: "${program.address}",`);
  
    const ScheduleAdmissions = await hre.ethers.getContractFactory("ScheduleAdmissions");
    const scheduleAdmissions = await ScheduleAdmissions.deploy();
    await scheduleAdmissions.deployed();
    console.log(`ScheduleAdmissions: "${scheduleAdmissions.address}",`);

    const RegisterStudent = await hre.ethers.getContractFactory("RegisterStudent");
    const registerStudent = await RegisterStudent.deploy();
    await registerStudent.deployed();
    console.log(`RegisterStudent: "${registerStudent.address}",`);

    const RequestUpdate = await hre.ethers.getContractFactory("RequestUpdate");
    const requestUpdate= await RequestUpdate .deploy();
    await requestUpdate.deployed();
    console.log(`RequestUpdate: "${requestUpdate.address}",`);

    const UpdateStudent = await hre.ethers.getContractFactory("UpdateStudent");
    const updateStudent = await UpdateStudent .deploy();
    await updateStudent.deployed();
    console.log(`UpdateStudent: "${updateStudent.address}",`);

    const StudentHistory = await hre.ethers.getContractFactory("StudentHistory");
    const studentHistory = await StudentHistory .deploy();
    await studentHistory.deployed();
    console.log(`StudentHistory: "${studentHistory.address}"`);

    await program.setAdminContract(admin.address);
    await scheduleAdmissions.setAdminContract(admin.address);
    await registerStudent.setAdminContract(admin.address);    
    await registerStudent.setProgramContract(program.address);
    await studentHistory.setAdminContract(admin.address);
    await requestUpdate.setRegisterStudentContract(registerStudent.address);
    await updateStudent.setAdminContract(admin.address);
    await updateStudent.setRegisterStudentContract(registerStudent.address);
    await updateStudent.setRequestUpdateContract(requestUpdate.address);
    await updateStudent.setStudentHistoryContract(studentHistory.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
