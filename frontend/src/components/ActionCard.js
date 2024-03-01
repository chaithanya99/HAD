// src/components/ActionCard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ActionCard = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleCardClick = (route) => {
    navigate(route);
  };

  const handleDropdownSelect = (route) => {
    navigate(route);
    setDropdownOpen(false);
  };

  return (
    <div className="action-card dashboard-card">
      <div className="action-buttons">
        <div className="action-button" onClick={() => handleCardClick('/appointments')}>
          Appointments
        </div>
        {/* <div className="action-button" onClick={() => handleCardClick('/register-patient')}>
          Register Patient
        </div> */}
        <div className="dropdown-container">
          <div className="action-button dropdown-toggle" onClick={() => setDropdownOpen(!isDropdownOpen)}>
            Register Patient
          </div>
          {isDropdownOpen && (
            <div className="dropdown-options">
              <div className="dropdown-option" onClick={() => handleDropdownSelect('/register-patient')}>
                Create ABHA ID
              </div>
              <div className="dropdown-option" onClick={() => handleDropdownSelect('/register-patient-step2')}>
                Register using ABHA ID
              </div>
            </div>
          )}
        </div>
        <div className="action-button" onClick={() => handleCardClick('/reports')}>
          Reports
        </div>
        <div className="action-button" onClick={() => handleCardClick('/notifications')}>
          Notifications
        </div>
      </div>
    </div>
  );
};

export default ActionCard;