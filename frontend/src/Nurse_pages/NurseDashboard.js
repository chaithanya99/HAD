import React from 'react'
// import { Table } from "antd";
import './NurseDashboard.css'
import { MdPersonAdd } from "react-icons/md";
import { FaBell, FaCalendarAlt, FaClipboardList, FaFileAlt, FaUserInjured, FaUserMd, FaUserNurse, FaUserPlus } from "react-icons/fa";
import { RiEmpathizeLine } from "react-icons/ri";
import { FaBed } from "react-icons/fa";
import { MdOutlineBedroomParent } from "react-icons/md";
import { FaAmbulance } from "react-icons/fa";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import Sidebar from "../components/misc/Sidebar";
const NurseDashboard = ({sidebarExpanded}) => {
    if(sidebarExpanded)
      console.log("expanded");
    else  
      console.log("not");
    return (
        <div className={`container ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
          {/* <Sidebar /> */}
          {/* <div className="AfterSideBar"> */}
            <div className="maindiv">
              <button className="commondiv">
                {/* <div> */}
                  {/* <h1>{data?.doctor}</h1> */}
                  {/* <button>Doctor</button> */}
                  <p>Doctors</p>
                  <FaUserMd className='overviewIcon'></FaUserMd>
                {/* <MdPersonAdd className="overviewIcon" /> */}
                {/* </div> */}
              </button>
              {/* <div className="two commondiv">
                {" "}
                <div>
                 
                  <p>Nurse</p>
                </div>
                <FaUserNurse className="overviewIcon" />
              </div> */}
              <div className="three commondiv">
                <div>
                  {/* <h1>{data?.patient}</h1> */}
                  <p>Patients</p>
                </div>
                <FaUserInjured className='overviewIcon'></FaUserInjured>
                {/* <RiEmpathizeLine className="overviewIcon" /> */}
              </div>
              <div className="six commondiv">
                {" "}
                <div>
                  {/* <h1>{data?.admin}</h1> */}
                  <p>Appointments</p>
                </div>
                {/* <FaCalendarAlt */}
                <FaCalendarAlt className="overviewIcon" />
                {/* <RiAdminLine className="overviewIcon" /> */}
              </div>
              <div className="four commondiv">
                {" "}
                <div>
                  {/* <h1>{data?.bed}</h1> */}
                  <p>Register Patient</p>
                </div>
                <FaUserPlus className="overviewIcon" />
              </div>
    
              <div className="five commondiv">
                {" "}
                <div>
                  {/* <h1>{data?.ambulance}</h1> */}
                  <p>Notifications</p>
                </div>
                <FaBell className="overviewIcon" />
              </div>
              {/* <div className="six commondiv">
                {" "}
                <div>
                  
                  <p>Appointment</p>
                </div>
                <BsFillBookmarkCheckFill className="overviewIcon" />
              </div> */}
              <div className="six commondiv">
                {" "}
                <div>
                  {/* <h1>{data?.report}</h1> */}
                  <p>Reports</p>
                </div>
                <FaClipboardList className="overviewIcon" />
              </div>
            </div>
          {/* </div> */}
        </div>
      );
}

export default NurseDashboard;




