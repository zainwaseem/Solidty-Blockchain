import * as React from 'react';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { Grid, Button,TextField, InputLabel, Input } from '@mui/material';
import { create } from "ipfs-http-client";
export default function Review({ setActiveStep, activeStep, address, registerStudentContract, requestUpdateContract }) {
  const [picture, setPicture] = useState('');
  const [cnicPicture, setCnicPicture] = useState('');
  const [matricDegree, setMatricDegree] = useState('');
  const [interDegree, setInterDegree] = useState('');
  const [regId, setRegId] = useState('');
  const [address1, setAddress] = useState('');
  const [programCode, setProgramCode] = useState('');
  const [admissionDate, setAdmissionDate] = useState(0);
  const [reason, setReason] = useState('');
  const [selectedPicture, setSelectedPicture] = useState('');
  const [selectedCnicPicture, setSelectedCnicPicture] = useState('');
  const [selectedMatricDegree, setSelectedMatricDegree] = useState('');
  const [selectedInterDegree, setSelectedInterDegree] = useState('');
  
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
      const student1 = await requestUpdateContract.methods.getStudentRequestDetails(address).call({ from: address });
      if (student1.d_data.stored) {
        setActiveStep(activeStep + 1);
      }
      else {
        const student = await registerStudentContract.methods.get_student(address).call({ from: address });
        if (student.d_data.stored) {
          setRegId(student.Id);
          setAddress(student.addr);
          setProgramCode(student.programCode);
          setAdmissionDate(student.admission_date);
          setPicture("https://bas.infura-ipfs.io/ipfs/" + student.d_data.picture);
          setCnicPicture("https://bas.infura-ipfs.io/ipfs/" + student.d_data.cnic);
          setMatricDegree("https://bas.infura-ipfs.io/ipfs/" + student.d_data.ssc_degree);
          setInterDegree("https://bas.infura-ipfs.io/ipfs/" + student.d_data.hssc_degree);
          setSelectedPicture("https://bas.infura-ipfs.io/ipfs/" + student.d_data.picture);
          setSelectedCnicPicture("https://bas.infura-ipfs.io/ipfs/" + student.d_data.cnic);
          setSelectedMatricDegree("https://bas.infura-ipfs.io/ipfs/" + student.d_data.ssc_degree);
          setSelectedInterDegree("https://bas.infura-ipfs.io/ipfs/" + student.d_data.hssc_degree);
        }
      }
    } catch (err) {
      toast.error("Error Occured: " + err.message);
    }
  }
  useEffect(() => {
    fetchData();
  }, [address, registerStudentContract]);


  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    setPicture(file);
    setSelectedPicture(file.name);
  };

  const handleCnicPictureChange = (event) => {
    const file = event.target.files[0];
    setCnicPicture(file);
    setSelectedCnicPicture(file.name);
  };

  const handleMatricDegreeChange = (event) => {
    const file = event.target.files[0];
    setMatricDegree(file);
    setSelectedMatricDegree(file.name);
  };

  const handleInterDegreeChange = (event) => {
    const file = event.target.files[0];
    setInterDegree(file);
    setSelectedInterDegree(file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pic1 = await ipfs.add(picture);
    const cnic1 = await ipfs.add(cnicPicture);
    const matric1 = await ipfs.add(matricDegree);
    const inter1 = await ipfs.add(interDegree);
    try {
      await requestUpdateContract.methods.updateDocumentDetails(regId, address1, programCode, admissionDate, pic1.path, cnic1.path, matric1.path, inter1.path, reason).send({ from: address });
      toast.success('Document Details Added')
      setActiveStep(activeStep + 1);
    } catch (err) {
      toast.error("Error Occured: " + err.message)
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
            onChange={handlePictureChange}
          />
          {selectedPicture && <img src={selectedPicture} alt="Selected Picture" style={{ maxWidth: '100%', marginTop: '10px' }} />}
      
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="upload-photo">CNIC</InputLabel>
          <Input
            id="CnicPicture"
            name="uploadphoto"
            type="file"
            onChange={handleCnicPictureChange}
          />
          {selectedCnicPicture && <img src={selectedCnicPicture} alt="Selected Picture" style={{ maxWidth: '100%', marginTop: '10px' }} />}
      
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="upload-photo">Matric Degree</InputLabel>
          <Input
            id="MatricDegree"
            name="uploadphoto"
            type="file"
            onChange={handleMatricDegreeChange}
          />
          {selectedMatricDegree && <img src={selectedMatricDegree} alt="Selected Picture" style={{ maxWidth: '100%', marginTop: '10px' }} />}
      
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="upload-photo">Inter Degree</InputLabel>
          <Input
            id="upload-photo"
            name="uploadphoto"
            type="file"
            onChange={handleInterDegreeChange}
          />
          {selectedInterDegree && <img src={selectedInterDegree} alt="Selected Picture" style={{ maxWidth: '100%', marginTop: '10px' }} />}
      
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="reason"
            name="reason"
            label="Reason of Update"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
          />
        </Grid>
      </Grid>

      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '6%', marginLeft: '86%' }}>
        Submit
      </Button>
    </form>
  );
}