import contractAddresses from './config';
const abi=[
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_programCode",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_programName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_programShortForm",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_programType",
        "type": "string"
      }
    ],
    "name": "addProgram",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "allprograms",
    "outputs": [
      {
        "internalType": "string",
        "name": "programCode",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "programName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "programShortForm",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "programType",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_programCode",
        "type": "string"
      }
    ],
    "name": "checkProgram",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_programCode",
        "type": "string"
      }
    ],
    "name": "deleteProgram",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_prevProgramCode",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_newProgramCode",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_programName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_programShortForm",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_programType",
        "type": "string"
      }
    ],
    "name": "editProgram",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getProgramList",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "programCode",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "programName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "programShortForm",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "programType",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isActive",
            "type": "bool"
          }
        ],
        "internalType": "struct Program.program[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "setAdminContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
  const ProgramContract=web3 => {  
    return new web3.eth.Contract(abi, contractAddresses.Program);};
  export default ProgramContract