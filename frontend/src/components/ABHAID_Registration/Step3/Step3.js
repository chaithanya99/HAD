import React from 'react';
import './Step3.css'

const Step3 = ({ mobileNumber, handleSubmit, setMobileNumber, setStep, step }) => {
  return (
    <div className='Stage-3'>
      <p>Enter the mobile number to link to your ABHA Number</p>
      <form onSubmit={handleSubmit}>
        <label>
          <p1>Mobile Number:</p1>
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => {
              const number = e.target.value;
              setMobileNumber(number.replace(/\D/g, ''));
            }}
            maxLength={10}
            placeholder="Eg: 0123456789"
          />
        </label>
        <button type="button" onClick={handleSubmit}>
          Next
        </button>
      </form>
    </div>
  );
};

export default Step3;
