import React from 'react';
import './Step3.css'

const Step3 = ({ mobileNumber, handleSubmit, setMobileNumber, setStep, step }) => {
  return (
    <div className='Stage-3'>
      <p>Enter the mobile number you want to link your ABHA Number to</p>
      <form onSubmit={handleSubmit}>
        <label>
          Mobile Number:
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => {
              const number = e.target.value;
              setMobileNumber(number.replace(/\D/g, ''));
            }}
            maxLength={10}
            placeholder="Eg: 7829923447"
          />
        </label>
        <button type="button" onClick={handleSubmit}>
          Next
        </button>
      </form>
      {/* Remove the below button for final */}
      <button onClick={() => setStep(step - 1)}>Previous</button>
    </div>
  );
};

export default Step3;
