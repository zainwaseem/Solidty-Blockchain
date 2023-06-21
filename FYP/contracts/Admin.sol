// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
contract Admin{
address public owner;
constructor() {
     owner=msg.sender;
  }
function checkAdmin(address addr) external view returns (bool) {
   if(owner==addr){
    return true;}
    return false;
}

}



