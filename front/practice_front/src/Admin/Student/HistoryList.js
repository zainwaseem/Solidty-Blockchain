import React, { useEffect , useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {toast } from 'react-toastify';
function HistoryList({studentHistoryContract, address }) {
    const [students, setStudents] = useState([]);
    const fetchData = async () => {
      try {
        const studentAddr = localStorage.getItem("Student_address");
        const studentsArr = await studentHistoryContract.methods.getHistory(studentAddr).call({ from: address });
        setStudents(studentsArr);
      } catch (err) {
        toast.error("Error Occured: "+err.message)
      }
    }
    
    useEffect(() => {
      fetchData();
    }, [address,   studentHistoryContract]);  
    
  const handleView = (stu) => {
    localStorage.setItem("Student", stu);
}
    return (
      <div className="container">
        <h1>Student History</h1>
        {(students.length==0)?<h3>No Update History</h3> :
        <table >
          <thead>
            <tr>
              <th>Registration ID</th>
              <th>Student Name</th>
              <th>Program Code</th>
              <th>Admission Date</th>
              <th>View Details</th>
            </tr>
          </thead>
          <tbody>
          {students.map((student) => (
                <tr key={student.Id}>
                  <td>{student.Id}</td>
                  <td>{student.s_data.name}</td>
                  <td>{student.programCode}</td>
                  <td>{student.admission_date}</td>
                  <td>
                                            <Link to={"/Admin/Student/ViewHistoryDetails"} >
                                                <button onClick={() => handleView(student)}>View Details</button>
                                            </Link>
                                              </td>
                </tr>
              ))
            }
        </tbody>
        </table>}
        
      </div>
      
    );
  }
  
export default HistoryList;
