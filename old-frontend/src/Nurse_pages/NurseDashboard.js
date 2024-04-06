import React from 'react'
import './NurseDashboard.css'
import { FaBell, FaCalendarAlt, FaClipboardList, FaFileAlt, FaUserInjured, FaUserMd, FaUserNurse, FaUserPlus } from "react-icons/fa";

const NurseDashboard = ({sidebarExpanded}) => {
    return (
        <div className={`container ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
            <div className="nurse-maindiv">
              <button className="commondiv">
                  <p>Doctors</p>
                  <FaUserMd className='overviewIcon'></FaUserMd>
              </button>
              
              <div className="commondiv">
                <div>
                  
                  <p>Patients</p>
                </div>
                <FaUserInjured className='overviewIcon'></FaUserInjured>
                
              </div>
              <div className="commondiv">
                {" "}
                <div>
                  
                  <p>Appointments</p>
                </div>
                
                <FaCalendarAlt className="overviewIcon" />
                
              </div>
              <div className="commondiv">
                {" "}
                <div>
                  
                  <p>Register Patient</p>
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
              
              <div className="commondiv">
                {" "}
                <div>
                  
                  <p>Reports</p>
                </div>
                <FaClipboardList className="overviewIcon" />
              </div>
            </div>
          
        </div>
      );
}

export default NurseDashboard;




