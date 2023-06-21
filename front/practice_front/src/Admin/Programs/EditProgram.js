import React, {useState, useEffect} from "react";
import { Table, Button, Form } from "react-bootstrap";
import{Link, useNavigate} from "react-router-dom";
import {toast } from 'react-toastify';
function EditProgram({ address,programContract }){
    const[Program_Code, setProgram_Code] = useState("");
    const[Program_Name, setProgram_Name] = useState("");
    const[Program_ShortForm, setProgram_ShortForm] = useState("");
    const[Program_Type, setProgram_Type] = useState("");
    let history = useNavigate();

    const handleSubmit=  async(e) =>{
        e.preventDefault();
        try {
            await programContract.methods.editProgram(localStorage.getItem("Program_Code"),Program_Code, Program_Name, Program_ShortForm, Program_Type).send({ from: address })
            toast.success('Program edit successsfully');
            history("/Admin/Programs/Programs");
          } catch (err) {
            toast.error("error occured:" +err.message);
          }
    }

    useEffect(()=>{
        setProgram_Code(localStorage.getItem("Program_Code"))
        setProgram_Name(localStorage.getItem("Program_Name"))
        setProgram_ShortForm(localStorage.getItem("Program_ShortForm"))
        setProgram_Type(localStorage.getItem("Program_Type"))
    },[])

    return(
        <div>
            <Form className="d-grid gap-2" style={{margine:"15rem"}}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Control type = "text" placeholder="Enter Program Code" value={Program_Code} 
                     required onChange={(e) => setProgram_Code(e.target.value)}>
                     </Form.Control>

                     <Form.Control type = "text" placeholder="Enter Program Name" value={Program_Name} 
                     required onChange={(e) => setProgram_Name(e.target.value)}>
                     </Form.Control>

                     <Form.Control type = "text" placeholder="Enter Program Short" value={Program_ShortForm} 
                     required onChange={(e) => setProgram_ShortForm(e.target.value)}>
                     </Form.Control>

                     <Form.Control type = "text" placeholder="Enter Program Type" value={Program_Type} 
                     required onChange={(e) => setProgram_Type(e.target.value)}>
                     </Form.Control>

                </Form.Group>
                <Button onClick={(e) => handleSubmit(e)} type="submit">Update</Button>
            </Form>
        </div>
    )

}

export default EditProgram;