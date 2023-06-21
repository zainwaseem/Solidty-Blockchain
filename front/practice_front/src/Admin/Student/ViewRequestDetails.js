import React, { useEffect , useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ViewRequestDetails({address,registerStudentContract,requestUpdateContract}) {
    
    const [student, setStudent] = useState(null);    
    const [student1, setStudent1] = useState(null);
    async function fetchData() {
        const studentAddr = localStorage.getItem("Student_address");
        const studentData = await registerStudentContract.methods.get_student(studentAddr).call({ from: address });
        const studentData1 = await requestUpdateContract.methods.getStudentRequestDetails(studentAddr).call({ from: address });
        setStudent(studentData);
        setStudent1(studentData1);
      }
    useEffect(() => {   
        fetchData();
      }, [address, registerStudentContract,student,student1]);
      if (!student || !student1) {
        fetchData();
        return <div>Loading...</div>;
      }
      const handleView = (address) => {
        localStorage.setItem("Student_address", address);
    } 

    return (
      <div className="container">

      <h1>Student Data</h1>
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
          <tr>
                <td>{student.Id}</td>
                <td>{student.s_data.name}</td>
                <td>{student.programCode}</td>
                <td>{student.admission_date}</td>

                <td>
                                          <Link to={"/Admin/Student/ViewStudentDetails"} >
                                              <button onClick={() => handleView(student.addr)}>View Details</button>
                                          </Link>
                                            </td>
              </tr>
      </tbody>
      </table>
      <h1>Requested Data</h1>
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
            <tr>
                  <td>{student1.Id}</td>
                  <td>{student1.s_data.name}</td>
                  <td>{student1.programCode}</td>
                  <td>{student1.admission_date}</td>

                  <td>
                                            <Link to={"/Admin/Student/ViewRequestedDetails"} >
                                                <button onClick={() => handleView(student.addr)}>View Details</button>
                                            </Link>
                                              </td>
                </tr>
        </tbody>
        </table>
        
      </div>
      
    );
  }
  
export default ViewRequestDetails;
