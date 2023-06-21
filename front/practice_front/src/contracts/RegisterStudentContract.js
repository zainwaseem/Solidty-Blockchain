import contractAddresses from './config';
const abi=  [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_picture",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_cnic",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_ssc_degree",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_hssc_degree",
        "type": "string"
      }
    ],
    "name": "DocumentDetails",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_ssc_board_name",
        "type": "string"
      },
      {
        "internalType": "int256",
        "name": "_ssc_total_marks",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "_ssc_obtained_marks",
        "type": "int256"
      },
      {
        "internalType": "string",
        "name": "_hssc_board_name",
        "type": "string"
      },
      {
        "internalType": "int256",
        "name": "_hssc_total_marks",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "_hssc_obtained_marks",
        "type": "int256"
      }
    ],
    "name": "EducationalDetails",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_cnic",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_phone_no",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_ocupation",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_salary",
        "type": "string"
      }
    ],
    "name": "FatherDetails",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_surname",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_date_of_birth",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_cnic",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_gender",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_phone",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_address",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_city",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_country",
        "type": "string"
      }
    ],
    "name": "PersonalDetails",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
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
        "name": "st",
        "type": "tuple"
      },
      {
        "internalType": "address",
        "name": "adminAddr",
        "type": "address"
      }
    ],
    "name": "UpdateStudentData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_regId",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_programCode",
        "type": "string"
      }
    ],
    "name": "add_student",
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
    "name": "checkStudent",
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
    "inputs": [],
    "name": "getStudentsList",
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
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "get_student",
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
        "internalType": "struct student",
        "name": "",
        "type": "tuple"
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
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "setProgramContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
  const RegisterStudentContract=web3 => {  
    return new web3.eth.Contract(abi, contractAddresses.RegisterStudent);};
  export default RegisterStudentContract