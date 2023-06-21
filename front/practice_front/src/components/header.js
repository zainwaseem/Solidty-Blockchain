import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {toast } from 'react-toastify';
import AdminContract from '../contracts/AdminContract';
import ProgramContract from '../contracts/ProgramContract';
import ScheduleAdmissionContract from '../contracts/ScheduleAdmissionContract';
import RegisterStudentContract from '../contracts/RegisterStudentContract';
import RequestUpdateContract from '../contracts/RequestUpdateContract';
import UpdateStudentContract from '../contracts/UpdateStudentContract';
import StudentHistoryContract from '../contracts/StudentHistoryContract';
import Web3 from 'web3';

export const Header = ({setAddress,setProgramContract,setScheduleAdmissionContract,setRegisterStudentContract,setRequestUpdateContract,setStudentHistoryContract,setUpdateStudentContract}) => {
  const navigate = useNavigate();
  const [adminContract, setAdminContract] = useState(null);
  const [studentContract, setStudentContract] = useState(null);

  useEffect(() => { 
  }, [adminContract, navigate]);

  const connectAdmin = async () => {
    try {
      if (window.ethereum) {
        const accounts =await window.ethereum.request({ method: 'eth_requestAccounts' });
        await setAddress(accounts[0]);
        const web3Instance = new Web3(window.ethereum);
        const contract = await AdminContract(web3Instance);
        await setAdminContract(contract);
        if (adminContract) {
          try {
            const isAdmin = await adminContract.methods.checkAdmin(accounts[0]).call();
            if (isAdmin) {
              const web3Instance = new Web3(window.ethereum);
              const pc = await ProgramContract(web3Instance);
              const sa = await ScheduleAdmissionContract(web3Instance);              
              const rs = await RegisterStudentContract(web3Instance);                           
              const ru = await RequestUpdateContract(web3Instance);
              const us = await UpdateStudentContract(web3Instance);              
              const sh = await StudentHistoryContract(web3Instance);
              await setProgramContract(pc);
              await setScheduleAdmissionContract(sa);
              await setRegisterStudentContract(rs);
              await setRequestUpdateContract(ru);
              await setUpdateStudentContract(us);
              await setStudentHistoryContract(sh);
              navigate('/Admin');
            } else {
              toast.error('Invalid Admin Account: '+accounts[0]);
            }
          } catch (error) {
            toast.error('Error occurred: '+error.message);
          }
        }
      } else {
        toast.error('Install MetaMask extension!');
      }
    } catch (err) {
      toast.error('Error occurred: ' + err.message);
    }
  };
  const connectStudent = async () => {
    try {
      if (window.ethereum) {
        const accounts =await window.ethereum.request({ method: 'eth_requestAccounts' });
        await setAddress(accounts[0]);
        const web3Instance = new Web3(window.ethereum);
        const contract = await RegisterStudentContract(web3Instance);
        await setStudentContract(contract);        
        if (studentContract) {
          try {
            const Student = await studentContract.methods.get_student(accounts[0]).call();
            if (Student.isCreated) {
              const ru= await RequestUpdateContract(web3Instance);
              await setRequestUpdateContract(ru);
           await setRegisterStudentContract(contract);
              navigate('/dashboard');
            } else {
              toast.error('Invalid Student Account: '+accounts[0]);
            }
          } catch (error) {
            toast.error('Error occurred: '+error.message);
          }
        }
      } else {
        toast.error('Install MetaMask extension!');
      }
    } catch (err) {
      toast.error('Error occurred: ' + err.message);
    }
  };
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                Foundation University
                  <span></span>
                </h1>
                <p>One of Pakistan's Top Leading Institution delivering excelence and creating bright future since 2002</p>
                <button
                  className="btn btn-custom btn-lg page-scroll" onClick={connectAdmin}>Admin</button>{" "}
                <button
                  className="btn btn-custom btn-lg page-scroll" onClick={connectStudent}>Student</button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
