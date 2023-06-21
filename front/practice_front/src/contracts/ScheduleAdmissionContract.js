import contractAddresses from './config';
const abi=  [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_close",
        "type": "uint256"
      }
    ],
    "name": "extendAdmissionDate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAdmissionDates",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
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
        "internalType": "uint256",
        "name": "_open",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_close",
        "type": "uint256"
      }
    ],
    "name": "scheduleAdmission",
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
  }
]
  const ScheduleAdmissionContract=web3 => {  
    return new web3.eth.Contract(abi, contractAddresses.ScheduleAdmissions);};
  export default ScheduleAdmissionContract