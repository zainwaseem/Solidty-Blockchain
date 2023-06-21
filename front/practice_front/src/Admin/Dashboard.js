
import React, { useState ,useEffect} from "react";
import SideBar from './SideBar';
import Header from './Header';
import './Dashboard.css';
import { Outlet } from 'react-router-dom';
function AdminDashboard(props) {
    return(
      <>
      <div className="Dashboard">
      <header className="header"><Header /></header>
       <div className="body">
          <nav className="sidebar"><SideBar /></nav>
          <main className="content">
          <Outlet />
          </main>
      </div>
      
    </div>   
      <footer className="footer">Footer</footer>
      </>
  );
  };
  

export default AdminDashboard;
 