import contractAddresses from './config';
const abi=  [
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "Id",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "addr",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "programCode",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "admission_date",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "picture",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "cnic",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "ssc_degree",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "hssc_degree",
                "type": "string"
              },
              {
                "internalType": "bool",
                "name": "stored",
                "type": "bool"
              }
            ],
            "internalType": "struct documents",
            "name": "d_data",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "surname",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "date_of_birth",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "cnic",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "gender",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "phone_no",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "email",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "permanent_addr",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "city",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "country",
                "type": "string"
              },
              {
                "internalType": "bool",
                "name": "stored",
                "type": "bool"
              }
            ],
            "internalType": "struct personal_details",
            "name": "s_data",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "cnic",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "phone_no",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "ocupation",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "salary",
                "type": "string"
              },
              {
                "internalType": "bool",
                "name": "stored",
                "type": "bool"
              }
            ],
            "internalType": "struct father_details",
            "name": "f_data",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "ssc_board_name",
                "type": "string"
              },
              {
                "internalType": "int256",
                "name": "ssc_total_marks",
                "type": "int256"
              },
              {
                "internalType": "int256",
                "name": "ssc_obtained_marks",
                "type": "int256"
              },
              {
                "internalType": "string",
                "name": "hssc_board_name",
                "type": "string"
              },
              {
                "internalType": "int256",
                "name": "hssc_total_marks",
                "type": "int256"
              },
              {
                "internalType": "int256",
                "name": "hssc_obtained_marks",
                "type": "int256"
              },
              {
                "internalType": "bool",
                "name": "stored",
                "type": "bool"
              }
            ],
            "internalType": "struct education_details",
            "name": "e_data",
            "type": "tuple"
          },
          {
            "internalType": "bool",
            "name": "isCreated",
            "type": "bool"
          }
        ],
        "internalType": "struct student",
        "name": "s",
        "type": "tuple"
      }
    ],
    "name": "UpdateHistory",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "adr",
        "type": "address"
      }
    ],
    "name": "getHistory",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "Id",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "addr",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "programCode",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "admission_date",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "picture",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "cnic",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "ssc_degree",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "hssc_degree",
                "type": "string"
              },
              {
                "internalType": "bool",
                "name": "stored",
                "type": "bool"
              }
            ],
            "internalType": "struct documents",
            "name": "d_data",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "surname",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "date_of_birth",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "cnic",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "gender",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "phone_no",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "email",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "permanent_addr",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "city",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "country",
                "type": "string"
              },
              {
                "internalType": "bool",
                "name": "stored",
                "type": "bool"
              }
            ],
            "internalType": "struct personal_details",
            "name": "s_data",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "cnic",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "phone_no",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "ocupation",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "salary",
                "type": "string"
              },
              {
                "internalType": "bool",
                "name": "stored",
                "type": "bool"
              }
            ],
            "internalType": "struct father_details",
            "name": "f_data",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "ssc_board_name",
                "type": "string"
              },
              {
                "internalType": "int256",
                "name": "ssc_total_marks",
                "type": "int256"
              },
              {
                "internalType": "int256",
                "name": "ssc_obtained_marks",
                "type": "int256"
              },
              {
                "internalType": "string",
                "name": "hssc_board_name",
                "type": "string"
              },
              {
                "internalType": "int256",
                "name": "hssc_total_marks",
                "type": "int256"
              },
              {
                "internalType": "int256",
                "name": "hssc_obtained_marks",
                "type": "int256"
              },
              {
                "internalType": "bool",
                "name": "stored",
                "type": "bool"
              }
            ],
            "internalType": "struct education_details",
            "name": "e_data",
            "type": "tuple"
          },
          {
            "internalType": "bool",
            "name": "isCreated",
            "type": "bool"
          }
        ],
        "internalType": "struct student[]",
        "name": "",
        "type": "tuple[]"
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
  const StudentHistoryContract=web3 => {  
    return new web3.eth.Contract(abi, contractAddresses.StudentHistory);};
  export default StudentHistoryContract