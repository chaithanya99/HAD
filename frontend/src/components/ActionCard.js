// src/components/ActionCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ActionCard = () => {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div className="dashboard-card">
      <h3>Actions</h3>
      <div className="action-buttons">
        <div className="action-button" onClick={() => handleCardClick('/appointments')}>
          Appointments
        </div>
        <div className="action-button" onClick={() => handleCardClick('/register-patient')}>
          Register Patient
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
