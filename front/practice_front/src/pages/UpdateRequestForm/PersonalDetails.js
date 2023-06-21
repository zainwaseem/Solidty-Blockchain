import * as React from 'react';
import { useEffect , useState } from "react";

import {toast } from 'react-toastify';

import { Grid, Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';


export default function PersonalDetails({setActiveStep, activeStep,address,registerStudentContract,requestUpdateContract}) {
  const [name, setname] = useState('');
  const [surname, setsurname] = useState('');
  const [dateofbirth, setdateofbirth] = useState('');
  const [cnic, setcnic] = useState('');
  const [gender, setgender] = useState('');
  const [phoneno, setphoneno] = useState('');  
  const [email, setemail] = useState('');
  const [permanentaddr, setpermanentaddr] = useState('');
  const [city, setcity] = useState('');
  const [country, setcountry] = useState('');

  const fetchData = async () => {
    try {  
      const student1 = await requestUpdateContract.methods.getStudentRequestDetails(address).call({ from: address });
      if(student1.s_data.stored)
      {
        setActiveStep(activeStep+1); 
      }
      else{
        const student= await registerStudentContract.methods.get_student(address).call({ from: address });
        if(student.s_data.stored){
          setname(student.s_data.name);
          setsurname(student.s_data.surname);
          setdateofbirth(student.s_data.date_of_birth);
          setcnic(student.s_data.cnic);
          setgender(student.s_data.gender);
          setphoneno(student.s_data.phone_no);
          setemail(student.s_data.email);
          setpermanentaddr(student.s_data.permanent_addr);
          setcity(student.s_data.city);
          setcountry(student.s_data.country);
      }
      }
    } catch (err) {
      toast.error("Error Occured: "+err.message);
    }
  }
  useEffect(() => {
    fetchData();
  }, [address, registerStudentContract]); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await requestUpdateContract.methods.updatePersonalDetails(name, surname,dateofbirth,cnic, gender,phoneno,email,permanentaddr,city,country).send({ from: address })
      toast.success('Personal Details Added');
      setActiveStep(activeStep+1);
    } catch (err) {
      toast.error("Error Occured: "+err.message);
    }
   
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Personal Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={name}
            onChange={(event) => setname(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={surname}
            onChange={(event) => setsurname(event.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="dob"
            name="dob"
            label="Date of Birth: dd-mm-yyyy"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={dateofbirth}
            onChange={(event) => setdateofbirth(event.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="cnic"
            name="cnic"
            label="CNIC"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={cnic}
            onChange={(event) => setcnic(event.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>

          <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={gender}
              onChange={(event) => setgender(event.target.value)}
              label="gender"
            >
              <MenuItem value={'male'}>Male</MenuItem>
              <MenuItem value={'female'}>female</MenuItem>
              <MenuItem value={'others'}>Others</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={city}
            onChange={(event) => setcity(event.target.value)}
            style={{ marginTop: '8px' }} />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="permanent_addr"
            name="permanent_addr"
            label="Address"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={permanentaddr}
            onChange={(event) => setpermanentaddr(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email Address"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={email}
            onChange={(event) => setemail(event.target.value)}
          />
        </Grid>


        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={country}
            onChange={(event) => setcountry(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone_no"
            name="phone_no"
            label="Phone Number"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={phoneno}
            onChange={(event) => setphoneno(event.target.value)}
          />
        </Grid>

      </Grid>

      <Button type="submit" variant="contained" color="primary"  style={{ marginTop: '6%',marginLeft:'86%' }}>
        Submit
      </Button>
      
    </form>
  );
}