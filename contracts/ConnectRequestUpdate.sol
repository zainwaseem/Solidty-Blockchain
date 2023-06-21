// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
abstract contract connectRequestUpdate{
address reqUpdate;
function setRequestUpdateContract(address addr) public {
  reqUpdate=addr;
}
}