// src/components/Dashboard.js
import React from 'react';
import Navbar from './misc/Navbar';
import Sidebar from './misc/Sidebar';
import CalendarCard from './misc/CalendarCard';
import DoctorsListCard from './misc/DoctorsListCard';
import ActionCard from './ActionCard';
// import './NavbarSidebar.css'; // Import the CSS file for navbar and sidebar styling
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
    <Navbar />
      <div className="main-container">
        <Sidebar />
        <div className="content-container">
          <div className="main-content">
            <div className="left-column">
              <CalendarCard />
              <DoctorsListCard />
            </div>
            <div className="right-column">
              <ActionCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;