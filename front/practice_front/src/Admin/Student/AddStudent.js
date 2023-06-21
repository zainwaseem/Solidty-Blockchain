import React, { useState } from "react";
import {toast } from 'react-toastify';
import "./AddStudent.css"
function AddStudent({ address,registerStudentContract}) {
  const [regId, setRegId] = useState('');
  const [address1, setAddress] = useState('');
  const [programCode, setProgramCode] = useState('');
  const addStudent = async () => {
  
    try {
      await registerStudentContract.methods.add_student(regId, address1, programCode).send({ from: address });
      toast.success('Student added successfully');
    } catch (err) {
      toast.error("Error Occured: "+err.message);
    }
  }
   return (
    <div className="fields">
    <br/><br/>
      <input className="input-field" onChange={(e) => setRegId(e.target.value)}   type='type' placeholder="Enter Registration ID .." /> &nbsp;
      <input className="input-field" onChange={(e) => setAddress(e.target.value)}   type='type' placeholder="Enter metamask address.." /> &nbsp;
      <input className="input-field" onChange={(e) => setProgramCode(e.target.value)}  type='type' placeholder="Enter program code.." />
      <br/><br/>
      <button onClick={addStudent} className="btn btn-primary btn-lg">Add Student</button>
    </div>
  )
}

export default AddStudent;
