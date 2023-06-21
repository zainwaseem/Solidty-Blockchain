// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./StudentInterface.sol";
import "./AdminInterface.sol";
import "./ConnectAdmin.sol";
contract StudentHistory is connectAdmin{
mapping(address => student[]) history;
function UpdateHistory(student memory s) external {
        history[s.addr].push(s);
}
function getHistory(address adr) public view returns (student[] memory) {
  require(Admin1(admin).checkAdmin(msg.sender),"You are not Admin");
    return history[adr];
}

}
