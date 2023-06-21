// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
struct student{
    string Id;
    address addr;
    string programCode;
    uint admission_date;
    documents d_data;
    personal_details  s_data;
    father_details f_data;
    education_details e_data;
    bool isCreated;
}
struct documents{
    string picture;
    string cnic;
    string ssc_degree;
    string hssc_degree;
    bool stored;
}
struct personal_details {
    string name;
    string surname;
    string date_of_birth;
    string cnic;
    string gender;
    string phone_no;
    string email;
    string permanent_addr;
    string city;
    string country;
    bool stored;
  }
  struct father_details{
    string name;
    string cnic;    
    string phone_no;
    string ocupation;
    string salary;
    bool stored;
  }
   struct education_details{
    string ssc_board_name;
    int ssc_total_marks;
    int ssc_obtained_marks;
    string hssc_board_name;
    int hssc_total_marks;
    int hssc_obtained_marks;
    bool stored;
  }
  
