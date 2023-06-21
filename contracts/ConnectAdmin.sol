// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
abstract contract connectAdmin{
address admin;
function setAdminContract(address addr) public{
    admin =addr;
}
}