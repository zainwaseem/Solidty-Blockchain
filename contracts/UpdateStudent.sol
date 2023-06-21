// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./StudentInterface.sol";
import "./AdminInterface.sol";
import "./ConnectAdmin.sol";
import "./RegisterStudentInterface.sol";
import "./ConnectRegisterStudent.sol";
import "./RequestUpdateInterface.sol";
import "./ConnectRequestUpdate.sol";
import "./StudentHistoryInterface.sol";
import "./ConnectStudentHistory.sol";
contract UpdateStudent is connectRegisterStudent,connectRequestUpdate,connectAdmin,connectStudentHistory{
  function Approval(address _stuAddr,bool approval,string memory comments) public {
    require(Admin1(admin).checkAdmin(msg.sender),"You are not Admin");
        uint i=0;
        student[] memory pendingQueue=RequestUpdate1(reqUpdate).getPendingQueue();
        while (i<pendingQueue.length){
            if(pendingQueue[i].addr == _stuAddr){
              break;
              }
            i++;}
            if(approval){
              student memory st=RegisterStudent1(regStudent).get_student(pendingQueue[i].addr);
              History1(hstry).UpdateHistory(st);
              RegisterStudent1(regStudent).UpdateStudentData(pendingQueue[i],msg.sender);
              RequestUpdate1(reqUpdate).updatePendingQueue(i);
              RequestUpdate1(reqUpdate).setStatus(_stuAddr,"Approved",comments);
            }
            else{
            RequestUpdate1(reqUpdate).updatePendingQueue(i);
            RequestUpdate1(reqUpdate).setStatus(_stuAddr,"Rejected",comments);
            }
         }
}
