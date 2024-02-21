import React, { useState } from 'react';

const PatientRegistration = () => {
  const [step, setStep] = useState(1);
  const [aadharNumber, setAadharNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [iAgree, setIAgree] = useState(false);
  // Add more state variables for other form data

  // Function to handle form submission for each step
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check conditions based on the current step
    if (step === 1) {
      // Check Aadhar number and "I agree" checkbox
      if (aadharNumber.length === 16 && iAgree) {
        // Conditions met, proceed to the next step
        setStep(step + 1);
      } else {
        // Display an error message or handle invalid input
        alert('Please enter a valid Aadhar number and check the agreement.');
      }
    } else if (step === 2) {
      // Add logic for other steps if needed
      // For example, OTP verification logic
      // ...

      // Proceed to the next step
      setStep(step + 1);
    }
  };

  return (
    <div>
      {/* Render form based on the current step */}
      {step === 1 && (
        <div>
          <h2>Step 1: Aadhar Information</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Aadhar Number:
              <input
                type="text"
                value={aadharNumber}
                onChange={(e) => setAadharNumber(e.target.value)}
              />
            </label>
            {/* Add other form fields */}
            <label>
            <input
                type="checkbox"
                checked={iAgree}
                onChange={() => setIAgree(!iAgree)}
              />
              I agree
            </label>
            <button type="submit">Next</button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Step 2: OTP Verification</h2>
          {/* Render OTP input fields, timer, and resend button */}
          {/* Handle OTP input and submission logic */}
          <button onClick={() => setStep(step - 1)}>Previous</button>
          <button type="submit" onClick={handleSubmit}>
            Verify OTP
          </button>
        </div>
      )}

      {/* Add similar sections for other steps */}
    </div>
  );
};

export default PatientRegistration;
