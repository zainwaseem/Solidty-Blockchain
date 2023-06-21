import * as React from 'react';
import {CssBaseline, AppBar,Box, Container,Toolbar,Paper,Stepper, Step,StepLabel,
        Button,Link,Typography,createTheme,ThemeProvider} from '@mui/material';
import PersonalDetails from './PersonalDetails';
import Academicdetails from './Academicdetails';
import Review from './Review';
import FatherDetails from './FatherDetails';
import { useEffect , useState } from "react";

import {toast } from 'react-toastify';

const theme = createTheme();

export default function Checkout({address,registerStudentContract,requestUpdateContract}) {
    const [activeStep, setActiveStep] = React.useState(-1);
  const steps = ['Personal Details','Father Details' ,'Academics Deatils', 'Documents'];

  const fetchData = async () => {
    try {
      
      const student = await registerStudentContract.methods.checkStudent(address).call({ from: address });
      if(student){
        setActiveStep(activeStep+1);
      }
    } catch (err) {
      toast.error("Error Occured: "+err.message);
    }
  }
  useEffect(() => {
    fetchData();
  }, [address, registerStudentContract]); 

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PersonalDetails address={address} registerStudentContract={registerStudentContract} requestUpdateContract={requestUpdateContract} setActiveStep={setActiveStep} activeStep={activeStep}/>;
      case 1:
        return <FatherDetails address={address} registerStudentContract={registerStudentContract} requestUpdateContract={requestUpdateContract} setActiveStep={setActiveStep} activeStep={activeStep}/>;
      case 2:
        return <Academicdetails address={address} registerStudentContract={registerStudentContract} requestUpdateContract={requestUpdateContract} setActiveStep={setActiveStep} activeStep={activeStep}/>;
      case 3:
          return <Review address={address} registerStudentContract={registerStudentContract} requestUpdateContract={requestUpdateContract} setActiveStep={setActiveStep} activeStep={activeStep}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
       />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Update Request Form
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>      
          {activeStep === -1 ? (
            <>
              <Typography variant="h5" gutterBottom>
                Your Registration is Incomplete
              </Typography>
              <Typography variant="subtitle1">
               First register yourself then you can send update request to the admisnistrator for approval
              </Typography>
            </>
          ):(activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Request for update Submitted
              </Typography>
              <Typography variant="subtitle1">
                To check your status of approval. Go to Status Page
              </Typography>
            </>
          ) : (
            <>
              {getStepContent(activeStep)}
              
            </>
          ))};
        </Paper>
        
      </Container>
    </ThemeProvider>
  );
}