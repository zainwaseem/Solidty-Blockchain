// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./AdminInterface.sol";
import "./ConnectAdmin.sol";
import "./ProgramInterface.sol";
import "./ConnectProgram.sol";
import "./StudentInterface.sol";
contract RegisterStudent is connectAdmin,connectProgram{
  mapping(address =>student) students;
  mapping(string =>address) s_id;
  student[] allStudents;
 
  function add_student(string memory _regId,address _addr, string memory _programCode ) public {
    require(Admin1(admin).checkAdmin(msg.sender),"You are not Admin");
    require(!students[s_id[_regId]].isCreated,"Invalid registration Id");
    require(!students[_addr].isCreated,"Student is already registered");
    require(Program1(prog).checkProgram(_programCode),"Program is not registered");
    students[_addr].addr=_addr;
    students[_addr].Id=_regId;
    students[_addr].programCode=_programCode;
    students[_addr].admission_date=block.timestamp;
    students[_addr].isCreated=true;
    s_id[_regId]=_addr;
  }
   function checkStudent( address addr) external view returns (bool) {
    if(students[addr].s_data.stored && students[addr].f_data.stored && students[addr].e_data.stored && students[addr].d_data.stored)
          return true;
    return false;
  }
  function get_student(address _addr) external view returns(student memory) {
    return students[_addr];
  }
  function PersonalDetails(string memory _name, string memory _surname,string memory _date_of_birth,string memory _cnic, string memory _gender,string memory _phone, string memory _email,string memory _address, string memory _city,string memory _country) public {
      require(students[msg.sender].isCreated, "Invalid metamask account");
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
  function FatherDetails(string memory _name,string memory _cnic,string memory _phone_no, string memory _ocupation,string memory _salary) public {
      require(students[msg.sender].isCreated, "Invalid metamask account");
      students[msg.sender].f_data.name=_name;
      students[msg.sender].f_data.cnic=_cnic;      
      students[msg.sender].f_data.phone_no=_phone_no;
      students[msg.sender].f_data.ocupation=_ocupation;
      students[msg.sender].f_data.salary=_salary;
      students[msg.sender].f_data.stored=true;
  }
  function EducationalDetails(string memory _ssc_board_name,int _ssc_total_marks,int _ssc_obtained_marks,string memory _hssc_board_name,int _hssc_total_marks,int _hssc_obtained_marks) public {
      require(students[msg.sender].isCreated, "Invalid metamask account");
      students[msg.sender].e_data.ssc_board_name=_ssc_board_name;
      students[msg.sender].e_data.ssc_total_marks=_ssc_total_marks;
      students[msg.sender].e_data.ssc_obtained_marks=_ssc_obtained_marks;
      students[msg.sender].e_data.hssc_board_name=_hssc_board_name;
      students[msg.sender].e_data.hssc_total_marks=_hssc_total_marks;
      students[msg.sender].e_data.hssc_obtained_marks=_hssc_obtained_marks;
      students[msg.sender].e_data.stored=true;
  }
  function DocumentDetails(string memory _picture,string memory _cnic,string memory _ssc_degree,string memory _hssc_degree) public {
      require(students[msg.sender].isCreated, "Invalid metamask account");
      students[msg.sender].d_data.picture=_picture;
      students[msg.sender].d_data.cnic=_cnic;
      students[msg.sender].d_data.ssc_degree=_ssc_degree;
      students[msg.sender].d_data.hssc_degree=_hssc_degree;
      students[msg.sender].d_data.stored=true;
      allStudents.push(students[msg.sender]);
  }
  function getStudentsList() public view returns(student[] memory){
  require(Admin1(admin).checkAdmin(msg.sender),"You are not Admin");
  return allStudents;
  }
  function UpdateStudentData(student memory st,address adminAddr) external {    
  require(Admin1(admin).checkAdmin(adminAddr),"You are not Admin");
      students[st.addr]=st;
      uint i=0;
      while (i<allStudents.length){
          if(allStudents[i].addr==st.addr){   
          allStudents[i]=st;
            break;
        }
          i++;
      }   
  }
}
