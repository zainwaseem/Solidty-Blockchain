import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AddProgram.css";
import {toast } from 'react-toastify';
function AddProgram({address,programContract}) {
  const navigate = useNavigate();
  const [programCode, setProgramCode] = useState('')
  const [programName, setProgramName] = useState('')
  const [programShortForm, setProgramShortForm] = useState('')
  const [programType, setProgramType] = useState('')


  const addProgram = async () => {
    try {
      await programContract.methods.addProgram(programCode, programName, programShortForm, programType).send({ from: address });
      toast.success('Program added');
      navigate("/Admin/Programs/Programs");
    } catch (err) {
      toast.error(err.message)
    }
  }  

  return (
    <div className="fields">
    <br/><br/>
      <input className="input-field" onChange={(e) => setProgramCode(e.target.value)} type='type' placeholder="Enter program code.." required /> <br/> <br/>
      <input className="input-field" onChange={(e) => setProgramName(e.target.value)}  type='type' placeholder="Enter program full name.." required/><br/><br/>
      <input className="input-field" onChange={(e) => setProgramShortForm(e.target.value)} type='type' placeholder="Enter program short form.." required/> <br/><br/>
      <input className="input-field" onChange={(e) => setProgramType(e.target.value)}  type='type' placeholder="Enter program Type.." required/>
      <br/><br/>
      <button className="btn btn-primary btn-lg" onClick={addProgram}>Add Program</button>
      </div>
  )
}

export default AddProgram;
