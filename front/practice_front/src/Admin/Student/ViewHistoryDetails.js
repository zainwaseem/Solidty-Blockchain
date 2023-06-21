import React, { useEffect ,useState, useRef } from "react";
import './ViewStudentDetails.css';
import { create } from "ipfs-http-client";
const ViewHistoryDetails = ({}) => {
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
    useEffect(() => {
        async function fetchData() {
          const studentData = localStorage.getItem("Student");
          if (studentData) {
            const studentArray = studentData.split(",");
            setStudent(studentArray);
          }
        }
    
        fetchData();
      }, []);
    
    const handlePhotoClick = () => {
        inputRef.current.click();
    };
    if (!student) {
        return <div>Loading...</div>;
      }
    const handlePhotoChange = (event) => {
        setPhoto(URL.createObjectURL(event.target.files[0]));
    };
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
                    onClick={handlePhotoClick}
                >
                    {ipfs && (
                        <img
                            src={"https://bas.infura-ipfs.io/ipfs/" + student[4]}
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
                        <td>{student[0]}</td>
                        <td>Program Code</td>
                        <td>{student[2]}</td>
                    </tr>

                    <tr>
                        <td>Public Address</td>
                        <td>{student[1]}</td>
                        <td>Admission Date</td>
                        <td>{student[3]}</td>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                            <h4 className="text-center">Personal Details</h4>
                        </td>
                    </tr>
                    <tr>

                        <td>First Name</td>
                        <td>{student[9]}</td>
                        <td>Last Name</td>
                        <td>{student[10]}</td>

                    </tr>
                    <tr>
                        <td>Date of birth</td>
                        <td>{student[11]}</td>
                        <td>CNIC</td>
                        <td>{student[12]}</td>
                        

                    </tr>
                    <tr>
                        <td>Gender</td>
                        <td>{student[13]}</td>
                        <td>City</td>
                        <td>{student[14]}</td>
                        
                    </tr>
                    <tr>
                        <td>Country</td>
                        <td>{student[15]}</td>
                        <td>Permanent Address</td>
                        <td>{student[16]}</td>
                        

                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{student[17]}</td>
                        <td>Phone Number</td>
                        <td>{student[18]}</td>
                    </tr>

                    <tr>
                        <td colSpan={4}>
                            <h4 className="text-center">Father Details</h4>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>Name</td>
                        <td colSpan={2}>{student[19]}</td>
                        </tr>
                    <tr>
                        <td>CNIC</td>
                        <td>{student[20]}</td>

                    
                        <td>Occupation</td>
                        <td>{student[21]}</td>
                        </tr>
                    
                    <tr>
                        <td>Salary</td>
                        <td>{student[22]}</td>

                    
                        <td>Phone Number</td>
                        <td>{student[23]}</td>
                    </tr>

                    <tr>
                        <td colSpan={4}>
                            <h4 className="text-center">Educational Details</h4>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={2}>Matric Board Name</td>
                        <td colSpan={2}>{student[24]}</td>
                    </tr>

                    <tr>
                        <td>Matric Total Marks</td>
                        <td>{student[25]}</td>
                        <td>Matric Obtained Marks</td>
                        <td>{student[26]}</td>
                    </tr>

                    <tr>
                        <td colSpan={2}>Inter Board Name</td>
                        <td colSpan={2}>{student[27]}</td>
                    </tr>

                    <tr>
                        <td>Inter Total Marks</td>
                        <td>{student[28]}</td>
                        <td>Inter Obtained Marks</td>
                        <td>{student[29]}</td>
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
                            src={"https://bas.infura-ipfs.io/ipfs/" + student[5]}
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
                            src={"https://bas.infura-ipfs.io/ipfs/" + student[6]}
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
                            src={"https://bas.infura-ipfs.io/ipfs/" + student[7]}
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

export default ViewHistoryDetails;