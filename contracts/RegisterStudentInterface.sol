// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./StudentInterface.sol";
interface RegisterStudent1{
    function checkStudent( address addr) external view returns (bool);
    function get_student(address _addr) external view returns(student memory); 
    function UpdateStudentData(student memory st,address adminAddr) external;
}
