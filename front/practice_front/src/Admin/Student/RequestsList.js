import React, { useEffect , useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {toast } from 'react-toastify';
function RequestsList({requestUpdateContract, address}) {
  
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const fetchData = async () => {
      try {
        const studentsArr = await requestUpdateContract.methods.getPendingQueue().call({ from: address });
        setStudents(studentsArr);
      } catch (err) {
        toast.error("Error Occured: "+err.message)
      }
    }
    
    useEffect(() => {
      fetchData();
    }, [address,   requestUpdateContract]);  

    
  const handleView = (address) => {
    localStorage.setItem("Student_address", address);
}

const filteredStudents = students.filter((student) =>
student.Id.toLowerCase().includes(searchTerm.toLowerCase())
);
    return (
      <div className="container">
         <div className="student-controls">
                   <input
              type="text"
                 className="student-search"
                  placeholder="Enter Registration Id..."
                  value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                 />
          
        </div>
        <h1>Students List</h1>
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
          {searchTerm === "" // check if search bar is empty
            ? students.map((student) => (
                <tr key={student.Id}>
                  <td>{student.Id}</td>
                  <td>{student.s_data.name}</td>
                  <td>{student.programCode}</td>
                  <td>{student.admission_date}</td>
                  <td>
                                            <Link to={"/Admin/Student/ViewRequestDetails"} >
                                                <button onClick={() => handleView(student.addr)}>View Details</button>
                                            </Link>
                                              </td>
                </tr>
              ))
            : filteredStudents.map((student) => (
                <tr key={student.Id}>
                  <td>{student.Id}</td>
                  <td>{student.s_data.name}</td>
                  <td>{student.programCode}</td>
                  <td>{student.admission_date}</td>
                  <td>
                                            <Link to={"/Admin/Student/ViewRequestDetails"} >
                                                <button onClick={() => handleView(student.addr)}>View</button>
                                            </Link>
                                        </td>
                </tr>
              ))}
        </tbody>
        </table>
        
      </div>
      
    );
  }
  
export default RequestsList;
