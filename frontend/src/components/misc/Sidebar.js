// src/components/Sidebar.js
import React, { useState } from 'react';
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaAmbulance } from "react-icons/fa";
import { GiNurseFemale } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { SlUserFollow } from "react-icons/sl";
import { BsBookmarkPlus, BsFillBookmarkCheckFill } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaHospitalUser } from "react-icons/fa";
import { TbReportMedical } from "react-icons/tb";
import { MdBedroomChild } from "react-icons/md";
import { Link } from "react-router-dom";
import { ImMenu } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { TbBed } from "react-icons/tb";
import { MdDashboardCustomize } from "react-icons/md";
import { FaBars } from 'react-icons/fa';

import './Sidebar.css'; // Import the CSS file for styling

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const toggleSidebar = () => setExpanded(!expanded);

  const iconDescriptions = {
    AiOutlineUserAdd: "Add User",
    GiNurseFemale: "Nurse",
    RiSecurePaymentLine: "Secure Payment",
    SlUserFollow: "Follow User",
    FiLogOut: "Log Out"
  };

  return (
      <aside className={`sidebar ${expanded ? 'expanded' : ''}`}>
          <div className="expander">
            <button className="icons1" onClick={toggleSidebar}>
                <FaBars />
            </button>
          </div>
          <div className="Icondesign">
            <Link to="/logout" className="icons">
                <AiOutlineUserAdd />
                {expanded && <span>{iconDescriptions.AiOutlineUserAdd}</span>}
            </Link>
            <Link to="/logout" className="icons">
                <GiNurseFemale />
                {expanded && <span>{iconDescriptions.GiNurseFemale}</span>}
            </Link>
            <Link to="/logout" className="icons">
                <RiSecurePaymentLine />
                {expanded && <span>{iconDescriptions.RiSecurePaymentLine}</span>}
            </Link>
            <Link to="/logout" className="icons">
                <SlUserFollow />
                {expanded && <span>{iconDescriptions.SlUserFollow}</span>}
            </Link>
            <Link to="/logout" className="icons">
                <FiLogOut />
                {expanded && <span>{iconDescriptions.FiLogOut}</span>}
            </Link>
          </div>
      </aside>
  );
};

export default Sidebar;