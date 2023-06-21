// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./StudentInterface.sol";
import "./RegisterStudentInterface.sol";
import "./ConnectRegisterStudent.sol";
contract RequestUpdate is connectRegisterStudent{
student[] pendingQueue;
mapping(address =>student) students;
mapping(address=>string[2]) status;

function updatePersonalDetails(string memory _name, string memory _surname,string memory _date_of_birth,string memory _cnic, string memory _gender,string memory _phone,string memory _email,string memory _address, string memory _city,string memory _country) public {
    require(RegisterStudent1(regStudent).checkStudent(msg.sender), "You are not registered");
    students[msg.sender].s_data.name=_name;
    students[msg.sender].s_data.surname=_surname;
    students[msg.sender].s_data.date_of_birth=_date_of_birth;
    students[msg.sender].s_data.cnic=_cnic;
    students[msg.sender].s_data.gender=_gender;    
    students[msg.sender].s_data.phone_no=_phone;
    students[msg.sender].s_data.email=_email;
    students[msg.sender].s_data.permanent_addr=_address;
    students[msg.sender].s_data.city=_city;
    students[msg.sender].s_data.country=_country;
    students[msg.sender].s_data.stored=true;
}
function updateFatherDetails(string memory _name,string memory _cnic,string memory _phone_no, string memory _ocupation,string memory _salary) public {
    require(RegisterStudent1( regStudent).checkStudent(msg.sender), "You are not registered");
    students[msg.sender].f_data.name=_name;
    students[msg.sender].f_data.cnic=_cnic;    
    students[msg.sender].f_data.phone_no=_phone_no;
    students[msg.sender].f_data.ocupation=_ocupation;
    students[msg.sender].f_data.salary=_salary;    
    students[msg.sender].f_data.stored=true;
  }
 function updateEducationalDetails(string memory _ssc_board_name,int _ssc_total_marks,int _ssc_obtained_marks,
    string memory _hssc_board_name,int _hssc_total_marks,int _hssc_obtained_marks) public {
    require(RegisterStudent1( regStudent).checkStudent(msg.sender), "You are not registered");
    students[msg.sender].e_data.ssc_board_name=_ssc_board_name;
    students[msg.sender].e_data.ssc_total_marks=_ssc_total_marks;
    students[msg.sender].e_data.ssc_obtained_marks=_ssc_obtained_marks;
    students[msg.sender].e_data.hssc_board_name=_hssc_board_name;
    students[msg.sender].e_data.hssc_total_marks=_hssc_total_marks;
    students[msg.sender].e_data.hssc_obtained_marks=_hssc_obtained_marks;    
    students[msg.sender].e_data.stored=true;
  }
  function updateDocumentDetails(string memory _regId,address _addr, string memory _programCode,uint _admission_date,string memory _picture,string memory _cnic,string memory _ssc_degree,string memory _hssc_degree,string memory reasonofUpdate) public {
    require(RegisterStudent1( regStudent).checkStudent(msg.sender), "You are not registered");
    students[msg.sender].addr=_addr;
    students[msg.sender].Id=_regId;
    students[msg.sender].programCode=_programCode;
    students[msg.sender].admission_date=_admission_date;
    students[msg.sender].isCreated=true;
    students[msg.sender].d_data.picture=_picture;
    students[msg.sender].d_data.cnic=_cnic;
    students[msg.sender].d_data.ssc_degree=_ssc_degree;
    students[msg.sender].d_data.hssc_degree=_hssc_degree;
    students[msg.sender].d_data.stored=true;
    pendingQueue.push(students[msg.sender]);
    status[msg.sender][0]="Pending";
    status[msg.sender][1]=reasonofUpdate;
  }
function getPendingQueue() external view returns(student[] memory){
  return pendingQueue;

}
function updatePendingQueue(uint index) external{
if(index!=(pendingQueue.length-1)){
            pendingQueue[index]=pendingQueue[pendingQueue.length-1];
          }
      delete students[pendingQueue[index].addr];
       pendingQueue.pop(); 
          }

function setStatus(address _addr,string memory _status,string memory _comment) external {
      status[_addr][0]=_status;
      status[_addr][1]=_comment;        
}
function getStatus(address _addr) external view returns(string[2] memory) {
      return status[_addr];
}
function getStudentRequestDetails(address addr) public view returns(student memory){
  return students[addr];
}

}

