import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import "./Programs.css"
function Programs({ address, programContract }) {
  const [programs, setPrograms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, [address, programContract]);


  const fetchData = async () => {
    try {
      const programsArr = await programContract.methods.getProgramList().call({ from: address });
      setPrograms(programsArr);
    } catch (err) {
      toast.error('Error occurred: ' + err.message);
    }
  }


  const handleEdit = (Program_Code, Program_Name, Program_ShortForm, Program_Type) => {
    localStorage.setItem("Program_ShortForm", Program_ShortForm);
    localStorage.setItem("Program_Name", Program_Name);
    localStorage.setItem("Program_Type", Program_Type);
    localStorage.setItem("Program_Code", Program_Code);
  }


  const handleDelete = async (pCode) => {
    try {
      await programContract.methods.deleteProgram(pCode).send({ from: address })
      toast.success('Program deleted successsfully')
      fetchData();
    } catch (err) {
      toast.error('Error occurred: ' + err.message);
    }
  }


  const filteredPrograms = programs.filter((program) =>
    program.programName.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (

    <div className="container">
      <div className="programs-controls">
        <Link className="add-program-btn" to="/Admin/Programs/AddProgram"><button className="btn btn-primary btn-lg" >Add Program</button> </Link>
        <input type="text" className="programs-search" placeholder="Enter Program name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <h1>Programs</h1>
      <table >
        <thead>
          <tr>
            <th>Program Code</th>
            <th>Program Full-Name</th>
            <th>Program Short-Form </th>
            <th>Program Type</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {searchTerm === "" ?
            programs.map((program) => (
                  <tr key={program.programCode}>
                    <td>{program.programCode}</td>
                    <td>{program.programName}</td>
                    <td>{program.programShortForm}</td>
                    <td>{program.programType}</td>
                    <td>
                      <Link to={"/Admin/Programs/EditProgram"} >
                        <button className="btn btn-primary btn-lg" onClick={() => handleEdit(program.programCode, program.programName,
                          program.programShortForm, program.programType)}>Edit</button>
                      </Link>
                      &nbsp;
                      <button className="btn btn-primary btn-lg" onClick={() => handleDelete(program.programCode)}>Delete</button>
                    </td>
                  </tr>
            ))
            :filteredPrograms.map((program) => (
                  <tr key={program.programCode}>
                    <td>{program.programCode}</td>
                    <td>{program.programName}</td>
                    <td>{program.programShortForm}</td>
                    <td>{program.programType}</td>
                    <td>
                      <Link to={"/Admin/Programs/EditProgram"} >
                        <button className="btn btn-primary btn-lg" onClick={() => handleEdit(program.programCode, program.programName,
                          program.programShortForm, program.programType)}>Edit</button>
                      </Link>
                      &nbsp;
                      <button className="btn btn-primary btn-lg" onClick={() => handleDelete(program.programCode)}>Delete</button>
                    </td>
                  </tr>
            ))}
        </tbody>
      </table>
    </div>

  );
}

export default Programs;
