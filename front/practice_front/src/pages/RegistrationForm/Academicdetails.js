import * as React from 'react';
import { useEffect , useState } from "react";
import {toast } from 'react-toastify';
import { Grid,Button, Typography, TextField } from '@mui/material';

export default function Academicdetails({setActiveStep, activeStep,address,registerStudentContract}) {
  const [sscboardname, setsscboardname] = useState('');
  const [ssctotalmarks, setssctotalmarks] = useState('');
  const [sscobtainedmarks, setsscobtainedmarks] = useState('');
  const [hsscboardname, sethsscboardname] = useState('');
  const [hssctotalmarks, sethssctotalmarks] = useState('');
  const [hsscobtainedmarks, sethsscobtainedmarks] = useState('');
 
  const fetchData = async () => {
    try {
      
      const student = await registerStudentContract.methods.get_student(address).call({ from: address });
      if(student.e_data.stored){
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
    try {
    await registerStudentContract.methods.EducationalDetails(sscboardname,ssctotalmarks,sscobtainedmarks,hsscboardname,hssctotalmarks,hsscobtainedmarks).send({ from: address })
      toast.success('Educational Details Added')
      setActiveStep(activeStep+1);
    } catch (err) {
      toast.error("Error Occured: "+err.message)
    }
   
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
      Academic  Details
      </Typography>
      <Grid container spacing={3}>
       
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="ssc_board_name"
            name="ssc_board_name"
            label="Matric Board Name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={sscboardname}
            onChange={(event) => setsscboardname(event.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="ssc_total_marks"
            name="ssc_total_marks"
            label="Total Marks"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={ssctotalmarks}
            onChange={(event) => setssctotalmarks(event.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="ssc_obtained_marks"
            name="ssc_obtained_marks"
            label="Obtained Marks"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={sscobtainedmarks}
            onChange={(event) => setsscobtainedmarks(event.target.value)}
          />
        </Grid>
        
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="hssc_board_name"
            name="hssc_board_name"
            label="Inter Board Name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={hsscboardname}
            onChange={(event) => sethsscboardname(event.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="hssc_total_marks"
            name="hssc_total_marks"
            label="Total Marks"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={hssctotalmarks}
            onChange={(event) => sethssctotalmarks(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="hssc_obtained_marks"
            name="hssc_obtained_marks"
            label="Obtained Marks"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={hsscobtainedmarks}
            onChange={(event) => sethsscobtainedmarks(event.target.value)}
          />
        </Grid>
        
        
        

        
        
      </Grid>
      <Button type="submit" variant="contained" color="primary"  style={{ marginTop: '6%',marginLeft:'86%' }}>
        Submit
      </Button>
      </form>
  );
}