import React, { useState } from 'react'
import './CSS/AdminDashboard.css'
import Sidebar from '../components/misc/Sidebar'
import { FaBell, FaCalendarAlt, FaClipboardList, FaFileAlt, FaUserInjured, FaUserMd, FaUserNurse, FaUserPlus } from "react-icons/fa";
const AdminDashboard = () => {
    const [sidebarExpanded,setSidebarExpanded]=useState(false);
    const toggleSidebar=()=>{
        setSidebarExpanded(!sidebarExpanded);
    }
  return (
    <div>
        <Sidebar expanded={sidebarExpanded} toggleSidebar={toggleSidebar}></Sidebar>
        <div className={`container ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
            <div className="maindiv">
              <button className="commondiv">
                  <p>Doctors</p>
                  <FaUserMd className='overviewIcon'></FaUserMd>
              </button>
              
              <div className="commondiv">
                <div>
                  <p>Nurse</p>
                </div>
                <FaUserNurse className='overviewIcon'></FaUserNurse>
              </div>
              <div className="commondiv">
                {" "}
                <div>
                  <p>Add employee</p>
                </div>
                <FaUserPlus className="overviewIcon" />
              </div>
    
              <div className="commondiv">
                {" "}
                <div>
                  <p>Notifications</p>
                </div>
                <FaBell className="overviewIcon" />
              </div>
              
            </div>
        </div>
    </div>
  )
}

export default AdminDashboard