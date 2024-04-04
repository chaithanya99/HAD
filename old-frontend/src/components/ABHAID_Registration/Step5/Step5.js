import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Step5.css'

const Step5 = ({ abhaId }) => {
  const navigate = useNavigate();
  const handleNavigate = (route) => {
    navigate(route);
  }

  return (
    <div className='Stage-5'>
      <p>Your generated ABHA Number: {abhaId}</p>
      <button onClick={() => handleNavigate('/dashboard')}>
          Return to Dashboard
      </button>
    </div>    
  );
};

export default Step5;