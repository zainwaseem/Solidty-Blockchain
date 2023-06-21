import * as React from 'react';
import {CssBaseline, AppBar,Box, Container,Toolbar,Paper,Stepper, Step,StepLabel,
        Button,Link,Typography,createTheme,ThemeProvider} from '@mui/material';
import { useEffect , useState } from "react";
import {toast } from 'react-toastify';
const theme = createTheme();

export default function StatusPage({address,requestUpdateContract}) {
  const [status, setStatus] = useState('You have no Update Request');
  const [comments, setComments] = useState('');
  const fetchData = async () => {
    try {
      
      const st = await requestUpdateContract.methods.getStatus(address).call({ from: address });
      if(st[0]==""){
        setStatus("You have no Update Request");
      }
      else if(st[0]==="Pending"){
        setStatus("Your Update Request is Pending");
      }
      else{
        setStatus("Your Last Update Request was "+st[0]);
        setComments("Administrator Comments: "+st[1]);
      }
    } catch (err) {
      toast.error("Error Occured: "+err.message);
    }
  }
  useEffect(() => {
    fetchData();
  }, [address, requestUpdateContract]); 
  
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
            Staus of Update Request 
          </Typography>
          <>
              <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
                {status}
              </Typography>
              <Typography variant="subtitle1">
                {comments}
              </Typography>
            </>
        </Paper>
        
      </Container>
    </ThemeProvider>
  );
}
