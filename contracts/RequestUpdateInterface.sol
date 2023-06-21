// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./StudentInterface.sol";
interface RequestUpdate1{
    function checkStudent( address addr) external view returns (bool);
    function getPendingQueue() external view returns(student[] memory);
    function setStatus(address _addr,string memory _status,string memory _comment) external;
    function updatePendingQueue(uint index) external;
}
