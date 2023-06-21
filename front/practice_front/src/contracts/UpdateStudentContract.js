import contractAddresses from './config';
const abi= [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_stuAddr",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approval",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "comments",
        "type": "string"
      }
    ],
    "name": "Approval",
    "outputs": [],
    "stateMutability": "nonpayable",
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
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "setRegisterStudentContract",
    "outputs": [],
    "stateMutability": "nonpayable",
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
    "name": "setRequestUpdateContract",
    "outputs": [],
    "stateMutability": "nonpayable",
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
    "name": "setStudentHistoryContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
  const UpdateStudentContract=web3 => {  
    return new web3.eth.Contract(abi, contractAddresses.UpdateStudent);};
  export default UpdateStudentContract