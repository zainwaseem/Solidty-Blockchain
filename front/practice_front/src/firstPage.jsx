import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";

import { About } from "./components/about";

import { Gallery } from "./components/gallery";

import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import "./App.css";

const FirstPage = ({setAddress,setProgramContract,setScheduleAdmissionContract,setRegisterStudentContract ,setRequestUpdateContract,setStudentHistoryContract,setUpdateStudentContract}) => {
  const [landingPageData, setLandingPageData] = useState({});

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Navigation />
      <Header setAddress={setAddress} setProgramContract={setProgramContract} setScheduleAdmissionContract={setScheduleAdmissionContract} setRegisterStudentContract={setRegisterStudentContract} setRequestUpdateContract={setRequestUpdateContract} setUpdateStudentContract={setUpdateStudentContract} setStudentHistoryContract={setStudentHistoryContract} />

      <About data={landingPageData.About} />

      <Gallery data={landingPageData.Gallery} />

      <Team data={landingPageData.Team} />
      <Contact data={landingPageData.Contact} />
    </div>
  );
};

export default FirstPage;
