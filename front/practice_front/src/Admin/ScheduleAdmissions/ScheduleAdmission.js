import React, { useEffect, useState } from "react";
import {toast } from 'react-toastify';
function ScheduleAdmission ({  address,scheduleAdmissionContract }) {
  const [openDate, setOpenDate] = useState(new Date());
  const [closingDate, setClosingDate] = useState(new Date());
  const [date1,setDate1]=useState(null);
  const [date2,setDate2]=useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchData();
  }, [address, scheduleAdmissionContract, date1, date2, editMode]);
  
  const fetchData = async () => {
    try {
      const dates = await scheduleAdmissionContract.methods.getAdmissionDates().call({ from: address });
      const date1 = new Date(dates[0] * 1000);
      const formattedDate1 = `${date1.getDate()}/${date1.getMonth() + 1}/${date1.getFullYear()}`;
      setDate1(formattedDate1);
      const date2 = new Date(dates[1] * 1000);
      const formattedDate2 = `${date2.getDate()}/${date2.getMonth() + 1}/${date2.getFullYear()}`;
      setDate2(formattedDate2);
    } catch (err) {
      toast.error('Error occurred: ' + err.message);
    }
  }

  const scheduleAdmission = async () => {
    try {      
      const openingTimestamp = Math.floor(openDate.getTime() / 1000); 
      const closingTimestamp = Math.floor(closingDate.getTime() / 1000); 
      await scheduleAdmissionContract.methods.scheduleAdmission(openingTimestamp, closingTimestamp).send({ from: address });
      toast.success("Admission Scheduled successfully");
      setEditMode(false);
      fetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const editScheduledAdmission = async () => {
    try {
      setOpenDate(date1);
      setClosingDate(date2);
      const openingTimestamp = Math.floor(openDate.getTime() / 1000); 
      const closingTimestamp = Math.floor(closingDate.getTime() / 1000); 
      await scheduleAdmissionContract.methods.scheduleAdmission(openingTimestamp, closingTimestamp).send({ from: address });
      toast.success("Admission Scheduled successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <h1 className="heading">Schedule Admission</h1>
       <p>{date1}</p>
       <p>{date2}</p>
      <div className="field">
        <label className="labelname">Opening Date: dd-mm-yyyy</label><br/>
        <input type="number" value={openDate.getDate()} onChange={(e) => setOpenDate(new Date(openDate.getFullYear(), openDate.getMonth(), e.target.value))} />
        <input type="number" value={(openDate.getMonth() + 1)} onChange={(e) => setOpenDate(new Date(openDate.getFullYear(), e.target.value - 1, openDate.getDate()))} />
        <input type="number" value={openDate.getFullYear()} onChange={(e) => setOpenDate(new Date(e.target.value, openDate.getMonth(), openDate.getDate()))} /><br />
      </div>
      <br /><br /><br />
      <div className="field">
        <label className="labelname">Closing Date:</label><br/>
        <input type="number" min="1" max="31" value={closingDate.getDate()} onChange={(e) => setClosingDate(new Date(closingDate.getFullYear(), closingDate.getMonth(), e.target.value))} />
        <input type="number" min="1" max="12" value={(closingDate.getMonth() + 1)} onChange={(e) => setClosingDate(new Date(closingDate.getFullYear(), e.target.value - 1, closingDate.getDate()))} />
        <input type="number" min={openDate.getFullYear()} max={(openDate.getFullYear() + 10)} value={closingDate.getFullYear()} onChange={(e) => setClosingDate(new Date(e.target.value, closingDate.getMonth(), closingDate.getDate()))} />
        <br/><br/>
        {editMode ? (
    <button className="btn btn-primary btn-lg" onClick={scheduleAdmission}>
      Submit
    </button>
  ) : (
    <button className="btn btn-primary btn-lg" onClick={() => setEditMode(true)}>
      Edit Scheduled Admission
    </button>
  )}
      </div>
    </>
  );
};

export default ScheduleAdmission;
