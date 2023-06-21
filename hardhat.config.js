require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
module.exports = {
  solidity: "0.8.9",
  networks: {
    local: {
      url: 'http://localhost:8545'
    }

  }
};