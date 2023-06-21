import React, { useState } from "react";
import{ FaWarehouse,FaCalendarCheck,FaUserAlt,FaRegFile, FaBars} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import './SideBar.css';

function SideBar({ handlePageChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem = [
        {
            path: "/",
            name: "Dashboard",
            icon: <FaWarehouse/>
        },
        {
            path: "/Admin/ScheduleAdmissions/ScheduleAdmission",
            name: "Schedule Admission",
            icon: <FaCalendarCheck/>
        },
        {
            path: "/Admin/Programs/Programs",
            name: "Programs",
            icon: <FaRegFile/>
        },
        {
            path: "/Admin/Student/AddStudent",
            name: "Create Student Login",
            icon: <FaUserAlt/>
        },
        {
            path: "/Admin/Student/StudentsList",
            name: "View Student List",
            icon: <FaUserAlt/>
        },        
        {
            path: "/Admin/Student/RequestsList",
            name: "View Request List",
            icon: <FaUserAlt/>
        }   
    ]
    return(
        <div className="containers">
            <div className="sidebar">
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" >
                            <div className="icon">{item.icon}</div>
                            <div className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }    
            </div>
        </div>
    );
};

export default SideBar;
