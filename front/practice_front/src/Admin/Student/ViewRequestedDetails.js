import React, { useEffect, useState, useRef } from "react";
import './ViewStudentDetails.css';
import { Form, Button } from 'react-bootstrap';
import { create } from "ipfs-http-client";
import { Link, useNavigate } from "react-router-dom";

import {toast } from 'react-toastify';
const ViewRequestedDetails = ({ address ,registerStudentContract, requestUpdateContract,updateStudentContract}) => {
    let history = useNavigate();
    const [student, setStudent] = useState(null);
    const [reason, setReason] = useState('');
    const [reason1, setReason1] = useState([]);
    const handleReasonChange = (event) => {
        setReason(event.target.value);
    }
    const projectId = "2NxKo7SWNgVvNoqa3xA31FO9UP4";
    const projectSecret = "16e6d20b020b314b626c9f0ca0ff5df3";
    const authorization = "Basic " + btoa(projectId + ":" + projectSecret);

    const ipfs = create({
        url: "https://ipfs.infura.io:5001/api/v0",
        headers: {
            authorization
        }
    });
    useEffect(() => {
        async function fetchData() {
            const studentAddr = localStorage.getItem("Student_address");
            const studentData = await requestUpdateContract.methods.getStudentRequestDetails(studentAddr).call({ from: address });
            const reasonOfUpdate =   await requestUpdateContract.methods.getStatus(studentAddr).call({ from: address }) 
            setReason1(reasonOfUpdate);
            setStudent(studentData);
        }

        fetchData();
    }, [address, requestUpdateContract,updateStudentContract,registerStudentContract]);
    if (!student) {
        return <div>Loading...</div>;
    }
   
    const handleApproval = async() => {
        try {    
          await updateStudentContract.methods.Approval(student.addr,true,reason).send({ from: address });
        
          toast.success('Request Approved Successfully');
          history("/Admin/Student/StudentsList");
        } catch (err) {
            toast.error("Error Occured: "+err.message);
        }
    }
    const handleDisapproval = async() => {
        try {
          await updateStudentContract.methods.Approval(student.addr,false,reason).send({ from: address });
          toast.success('Request Rejected successfully');
          history("/Admin/Student/StudentsList");
        } catch (err) {
         toast.error("Error Occured: "+err.message);
        }
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
                    <tr>
                        <td colSpan={4}>
                            <h4 className="text-center">Reason Of Update</h4>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                            <p className="text-center">{reason1[1]}</p>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                            <h4 className="text-center">Write Comment</h4>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                            <Form >
                                <Form.Group controlId="formReason">
                                    <Form.Label>Reason of Update</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter reason"
                                        value={reason}
                                        onChange={handleReasonChange}
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                        <button onClick={() => handleApproval()}>Approve</button>
                         
                        </td>
                        <td colSpan={2}>
                        <button onClick={() => handleDisapproval()}>DisApprove</button>
                         
                        </td>
                    </tr>    
                    </tbody>           
                </table>
            </div>
        </>
    );
}

export default ViewRequestedDetails;