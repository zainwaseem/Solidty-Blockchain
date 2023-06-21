// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./AdminInterface.sol";
import "./ConnectAdmin.sol";
contract Program is connectAdmin{
  address public owner;
  constructor(){
    owner=msg.sender;
  }
  struct program{
    string programCode;
    string programName;
    string programShortForm;
    string programType;
    bool isActive;}
    
mapping(string =>program) programs;
program[] public allprograms;
function checkProgram(string memory _programCode) external view returns(bool) {
 if(programs[_programCode].isActive){
 return true;}
 return false;
} 
function addProgram(string memory _programCode, string memory _programName,string memory _programShortForm,string memory _programType) public{
    require(Admin1(admin).checkAdmin(msg.sender),"You are not Admin");
    require(!programs[_programCode].isActive, "Program already registered");
    programs[_programCode].programCode=_programCode;
    programs[_programCode].programName=_programName;
    programs[_programCode].programShortForm=_programShortForm;
    programs[_programCode].programType=_programType;
    programs[_programCode].isActive=true;
    allprograms.push(programs[_programCode]);
}
function editProgram(string memory _prevProgramCode, string memory _newProgramCode, string memory _programName, string memory _programShortForm,string memory _programType) public {
    require(Admin1(admin).checkAdmin(msg.sender),"You are not Admin");
    if(!(keccak256(bytes(_prevProgramCode)) == keccak256(bytes(_newProgramCode)))){
    require(!programs[_newProgramCode].isActive, "Program already registered with this code");}
    require(programs[_prevProgramCode].isActive, "Invalid program code");
    uint i=0;
     while (i<allprograms.length){
         if(keccak256(bytes(allprograms[i].programCode)) == keccak256(bytes(_prevProgramCode))){
          allprograms[i].programCode=_newProgramCode;
          allprograms[i].programName=_programName;
          allprograms[i].programShortForm=_programShortForm;
          allprograms[i].programType=_programType;
          break;}
        i++;}
    delete programs[_prevProgramCode];
    programs[_newProgramCode].programCode=_newProgramCode;
    programs[_newProgramCode].programName=_programName;
    programs[_newProgramCode].programShortForm=_programShortForm;
    programs[_newProgramCode].programType=_programType;
    programs[_newProgramCode].isActive=true;
    }

function deleteProgram(string memory _programCode) public {
   require(Admin1(admin).checkAdmin(msg.sender),"You are not Admin");
   require(programs[_programCode].isActive, "Invalid program code");
    uint i=0;
     while (i<allprograms.length){
        if(keccak256(bytes(allprograms[i].programCode)) == keccak256(bytes(_programCode))){
          if(i!=(allprograms.length-1)){
            allprograms[i]=allprograms[allprograms.length-1];
          }
            allprograms.pop();
  delete programs[_programCode];
          return;}
        i++;}
        }
function getProgramList() public view returns (program[] memory) {
    require(Admin1(admin).checkAdmin(msg.sender),"You are not Admin");
    return allprograms;
}
}