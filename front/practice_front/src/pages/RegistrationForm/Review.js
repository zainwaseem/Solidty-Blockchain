import * as React from 'react';
import { useEffect , useState } from "react";
import {toast } from 'react-toastify';
import { Grid,Button,InputLabel,Input } from '@mui/material';
import { create } from "ipfs-http-client";
export default function Review({setActiveStep, activeStep,address,registerStudentContract}) {
  const [picture, setPicture] = useState(null);
  const [cnicPicture, setCnicPicture] = useState(null);
  const [matricDegree, setMatricDegree] = useState(null);
  const [interDegree, setInterDegree] = useState(null);
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
      
      const student = await registerStudentContract.methods.get_student(address).call({ from: address });
      if(student.d_data.stored){
        setActiveStep(activeStep+1);
      }
    } catch (err) {
      toast.error("Error Occured: "+err.message);
    }
  }
  useEffect(() => {
    fetchData();
  }, [address, registerStudentContract]); 
  const handleSubmit  = async (e) => {
    e.preventDefault();
    const pic1 = await ipfs.add(picture);
    const cnic1 = await ipfs.add(cnicPicture);
    const matric1 = await ipfs.add(matricDegree);
    const inter1 = await ipfs.add(interDegree);
    try {
await registerStudentContract.methods.DocumentDetails(pic1.path, cnic1.path, matric1.path, inter1.path).send({ from: address });
      toast.success('Document Details Added')
      setActiveStep(activeStep+1);
    } catch (err) {
      toast.error("Error Occured: "+err.message)
    }
   
  };

  return (
    <form onSubmit={handleSubmit}>
    
    <Grid container spacing={3}>
    <Grid item xs={12} sm={6}>
  <InputLabel htmlFor="upload-photo">Picture</InputLabel>
  <Input
    id="Picture"
    name="uploadphoto"
    type="file"
    onChange={(event) => setPicture(event.target.files[0])}
  />
</Grid>

<Grid item xs={12} sm={6}>
  <InputLabel htmlFor="upload-photo">CNIC</InputLabel>
  <Input
    id="CnicPicture"
    name="uploadphoto"
    type="file"
    onChange={(event) => setCnicPicture(event.target.files[0])}
  />
</Grid>

<Grid item xs={12} sm={6}>
  <InputLabel htmlFor="upload-photo">Matric Degree</InputLabel>
  <Input
    id="MatricDegree"
    name="uploadphoto"
    type="file"
    onChange={(event) => setMatricDegree(event.target.files[0])}
  />
</Grid>

<Grid item xs={12} sm={6}>
  <InputLabel htmlFor="upload-photo">Inter Degree</InputLabel>
  <Input
    id="upload-photo"
    name="uploadphoto"
    type="file"
    onChange={(event) => setInterDegree(event.target.files[0])}
  />
</Grid>
  

      </Grid>
      <Button type="submit" variant="contained" color="primary"  style={{ marginTop: '6%',marginLeft:'86%' }}>
        Submit
      </Button>
      </form>
     );
}