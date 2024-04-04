import React, { useState } from 'react'
import { FaBell, FaCalendarAlt, FaClipboardList, FaFileAlt, FaUserInjured, FaUserMd, FaUserNurse, FaUserPlus } from "react-icons/fa";
import Sidebar from '../components/misc/Sidebar';
const DoctorDashboard = () => {
    const [sidebarExpanded, setSidebarExpanded] = useState(false);
    const toggleSidebar = () => {
        setSidebarExpanded(!sidebarExpanded);
    }
    return (
        <div>
            <Sidebar expanded={sidebarExpanded} toggleSidebar={toggleSidebar}></Sidebar>
            <div className={`container ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
                <div className="maindiv">
                    

                    <div className="commondiv">
                        <div>
                            <p>Patients</p>
                        </div>
                        <FaUserInjured className='overviewIcon'></FaUserInjured>
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

                            <p>Appointments</p>
                        </div>

                        <FaCalendarAlt className="overviewIcon" />

                    </div>
                    <div className="commondiv">
                        {" "}
                        <div>

                            <p>Nurse</p>
                        </div>
                        <FaUserNurse className="overviewIcon" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorDashboard