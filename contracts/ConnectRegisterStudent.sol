// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
abstract contract connectRegisterStudent{
address regStudent;
function setRegisterStudentContract(address addr) public {
  regStudent=addr;
}
}