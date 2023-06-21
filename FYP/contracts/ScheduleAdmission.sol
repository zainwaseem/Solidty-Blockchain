// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./AdminInterface.sol";
import "./ConnectAdmin.sol";
contract ScheduleAdmissions is connectAdmin{
address public owner;
uint  OpenAdmission;
uint  CloseAdmission; 
function scheduleAdmission(uint _open , uint _close) public{
   require(Admin1(admin).checkAdmin(msg.sender),"You are not Admin");
    OpenAdmission=_open;
    CloseAdmission=_close;
}
function getAdmissionDates() public view returns(uint , uint ){
    return (OpenAdmission,CloseAdmission);
}
function extendAdmissionDate(uint _close) public{
    require(Admin1(admin).checkAdmin(msg.sender),"You are not Admin");
    require(isAdmissionScheduled(),"Admissions are not scheduled");
    CloseAdmission=_close;
  }
   function isAdmissionScheduled() internal view returns(bool) {
    if(OpenAdmission>0){
        return true;
    }
    return false;
  }
  }