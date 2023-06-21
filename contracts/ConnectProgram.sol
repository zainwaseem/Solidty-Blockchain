// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
abstract contract connectProgram{
address prog; 
  function setProgramContract(address addr) public {
  prog=addr;
}}