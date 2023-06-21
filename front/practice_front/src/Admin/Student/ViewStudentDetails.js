import React, { useEffect ,useState, useRef } from "react";
import './ViewStudentDetails.css';
import { create } from "ipfs-http-client";

import {toast } from 'react-toastify';
const ViewStudentDetails = ({registerStudentContract, address }) => {
    const [photo, setPhoto] = useState(null);
    const [student, setStudent] = useState(null);
    const [studentAddr, setStudentAddr] = useState(null);
    const inputRef = useRef(null);
    const projectId = "2NxKo7SWNgVvNoqa3xA31FO9UP4";
    const projectSecret = "16e6d20b020b314b626c9f0ca0ff5df3";
    const authorization = "Basic " + btoa(projectId + ":" + projectSecret);
  
    const ipfs = create({
      url: "https://ipfs.infura.io:5001/api/v0",
      headers: {
        authorization
      }
    });
    const fetchData = async () => {
        try {
            const studentAddr = localStorage.getItem("Student_address");
            const studentData = await registerStudentContract.methods.get_student(studentAddr).call({ from: address });
            setStudent(studentData);
        } catch (err) {
          toast.error("Error Occured: "+err.message);
        }
      }
      useEffect(() => {
      fetchData();
    }, []);
      
    if (!student) {
        return <div>Loading...</div>;
      }
    return (
        <>
            <div className="image-container">
                <div
                    style={{
                        width: "200px",
                        height: "200px",
                        border: "2px dashed gray",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    {ipfs && (
                        <img
                            src={"https://bas.infura-ipfs.io/ipfs/" + student.d_data.picture}
                            alt="Passport Size Photo"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    )} 
                </div>
            </div>


            <div className="col-md-12 text-center">
                {" "}
                <h1>Student Details</h1>
            </div>
            <br />
            <br />

            <div className="Student">
                <table>
                <tbody>
                <tr>
                        <td>Registration Id</td>
                        <td>{student.Id}</td>
                        <td>Program Code</td>
                        <td>{student.programCode}</td>
                    </tr>

                    <tr>
                        <td>Public Address</td>
                        <td>{student.addr}</td>
                        <td>Admission Date</td>
                        <td>{student.admission_date}</td>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                            <h4 className="text-center">Personal Details</h4>
                        </td>
                    </tr>
                    <tr>

                        <td>First Name</td>
                        <td>{student.s_data.name}</td>
                        <td>Last Name</td>
                        <td>{student.s_data.surname}</td>

                    </tr>
                    <tr>
                        <td>CNIC</td>
                        <td>{student.s_data.cnic}</td>
                        <td>Date of birth</td>
                        <td>{student.s_data.date_of_birth}</td>

                    </tr>
                    <tr>
                        <td>Gender</td>
                        <td>{student.s_data.gender}</td>
                        <td>Permanent Address</td>
                        <td>{student.s_data.permanent_addr}</td>

                    </tr>
                    <tr>
                        <td>City</td>
                        <td>{student.s_data.city}</td>
                        <td>Country</td>
                        <td>{student.s_data.country}</td>

                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{student.s_data.email}</td>
                        <td>Phone Number</td>
                        <td>{student.s_data.phone_no}</td>
                    </tr>


                    <tr>
                        <td colSpan={4}>
                            <h4 className="text-center">Father Details</h4>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>Name</td>
                        <td colSpan={2}>{student.f_data.name}</td>
                        </tr>
                    <tr>
                        <td>CNIC</td>
                        <td>{student.f_data.cnic}</td>

                    
                        <td>Occupation</td>
                        <td>{student.f_data.ocupation}</td>
                        </tr>
                    
                    <tr>
                        <td>Salary</td>
                        <td>{student.f_data.salary}</td>

                    
                        <td>Phone Number</td>
                        <td>{student.f_data.phone_no}</td>
                    </tr>

                    <tr>
                        <td colSpan={4}>
                            <h4 className="text-center">Educational Details</h4>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={2}>Matric Board Name</td>
                        <td colSpan={2}>{student.e_data.ssc_board_name}</td>
                    </tr>

                    <tr>
                        <td>Matric Total Marks</td>
                        <td>{student.e_data.ssc_total_marks}</td>
                        <td>Matric Obtained Marks</td>
                        <td>{student.e_data.ssc_obtained_marks}</td>
                    </tr>

                    <tr>
                        <td colSpan={2}>Inter Board Name</td>
                        <td colSpan={2}>{student.e_data.ssc_board_name}</td>
                    </tr>

                    <tr>
                        <td>Inter Total Marks</td>
                        <td>{student.e_data.hssc_total_marks}</td>
                        <td>Inter Obtained Marks</td>
                        <td>{student.e_data.hssc_obtained_marks}</td>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                            <h4 className="text-center">CNIC/B-Form Document</h4>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                        {ipfs && (
                        <img
                            src={"https://bas.infura-ipfs.io/ipfs/" + student.d_data.cnic}
                            alt="Passport Size Photo"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    )} 
                        </td>
                        
                    </tr>
                    <tr>
                        <td colSpan={4}>
                            <h4 className="text-center">Matric Document</h4>
                        </td>
                        
                    </tr>
                    <tr>
                        <td colSpan={4}>
                        {ipfs && (
                        <img
                            src={"https://bas.infura-ipfs.io/ipfs/" + student.d_data.ssc_degree}
                            alt="Passport Size Photo"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    )} 
                        </td>
                        
                    </tr>
                    <tr>
                        <td colSpan={4}>
                            <h4 className="text-center">Intermediate Document</h4>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                        {ipfs && (
                        <img
                            src={"https://bas.infura-ipfs.io/ipfs/" + student.d_data.hssc_degree}
                            alt="Passport Size Photo"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    )} 
                        </td>
                        
                    </tr>
</tbody>
                </table>
            </div>
        </>
    );
}

export default ViewStudentDetails;