import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const PatientRegistration = () => {
  const [step, setStep] = useState(1);
  const [aadharNumber, setAadharNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [iAgree, setIAgree] = useState(false);
  const [timer, setTimer] = useState(60);
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileOtp, setMobileOtp] = useState('');
  const [txn, setTxn] = useState('B'); // A or B
  // const [profileData, setProfileData] = useState({
  //   firstName: 'John',
  //   middleName: 'Doe',
  //   lastName: 'Smith',
  //   dateOfBirth: '01/01/1990',
  //   profileImage: 'url_to_sample_image', // Replace with an actual URL or image source
  // });
  // Add more state variables for other form data

  // Function to handle form submission for each step
  const handleSubmit = async (e) => {
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
    } else if (step === 3) {
      try {
        const response = await axios.post('your_backend_api', { mobileNumber });

        // Handle the response with the 'txn' variable
        setTxn(response.data.txn);

        // Proceed to the next step
        setStep(step + 1);
      } catch (error) {
        // Handle errors from the backend
        console.error('Error:', error.message);
      }
    } else if (step === 4) {
      // Step 4: Display content based on the 'txn' value
      if (txn === 'A') {
        // Mobile number already verified, display completion message
        // ...
      } else if (txn === 'B') {
        // Mobile number needs OTP verification again, similar to Step 2
        // ...

        // Proceed to the next step
        setStep(step + 1);
      }
    }

  };

  // Function to handle OTP resend
  const handleResend = () => {
    // Implement OTP resend logic
    // For example, you can reset the timer and resend OTP
    setTimer(60); // Reset timer to initial value
    // Implement logic to resend OTP
  };

  // Effect to update the timer every second
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    // Clear the interval when component unmounts or when timer reaches 0
    return () => clearInterval(countdown);
  }, []);

  return (
    <div>
    <Navbar/>
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
          <p>Enter the OTP sent to your mobile number.</p>
          <form onSubmit={handleSubmit}>
            {/* Render OTP input fields */}
            <div>
              <input
                type="text"
                maxLength="1"
                value={otp[0] || ''}
                onChange={(e) => setOtp(e.target.value)}
              />
              <input
                type="text"
                maxLength="1"
                value={otp[1] || ''}
                onChange={(e) => setOtp((prevOtp) => [prevOtp[0], e.target.value])}
              />
              <input
                type="text"
                maxLength="1"
                value={otp[2] || ''}
                onChange={(e) => setOtp((prevOtp) => [prevOtp[0], prevOtp[1], e.target.value])}
              />
              <input
                type="text"
                maxLength="1"
                value={otp[3] || ''}
                onChange={(e) => setOtp((prevOtp) => [prevOtp[0], prevOtp[1], prevOtp[2], e.target.value])}
              />
            </div>
            {/* Render timer and resend button */}
            <p>Time remaining: {timer} seconds</p>
            <button type="button" onClick={handleResend} disabled={timer > 0}>
              Resend OTP
            </button>
            {/* Add other form fields */}
            <button type="submit">Verify OTP</button>
          </form>
          <button onClick={() => setStep(step - 1)}>Previous</button>
        </div>
      )}

      {step === 3 && (
              <div>
                <h2>Step 3: Enter Mobile Number</h2>
                <form onSubmit={handleSubmit}>
                  <label>
                    Mobile Number:
                    <input
                      type="text"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />
                  </label>
                  <button type="button" onClick={() => setStep(step + 1)}>
                    Next
                  </button>
                </form>
                <button onClick={() => setStep(step - 1)}>Previous</button>
              </div>
            )}

      {step === 4 && (
        <div>
          <h2>Step 4: Final Step</h2>
          {/* Render content based on 'txn' value */}
          {txn === 'A' ? (
            <p>Verification process completed. Display completion message here.</p>
          ) : txn === 'B' ? (
            <div>
              <h3>Step 4: OTP Verification</h3>
              <p>Enter the OTP sent to your mobile number.</p>
          <form onSubmit={handleSubmit}>
            {/* Render OTP input fields */}
            <div>
              <input
                type="text"
                maxLength="1"
                value={mobileOtp[0] || ''}
                onChange={(e) => setMobileOtp(e.target.value)}
              />
              <input
                type="text"
                maxLength="1"
                value={mobileOtp[1] || ''}
                onChange={(e) => setMobileOtp((prevOtp) => [prevOtp[0], e.target.value])}
              />
              <input
                type="text"
                maxLength="1"
                value={mobileOtp[2] || ''}
                onChange={(e) => setMobileOtp((prevOtp) => [prevOtp[0], prevOtp[1], e.target.value])}
              />
              <input
                type="text"
                maxLength="1"
                value={mobileOtp[3] || ''}
                onChange={(e) => setMobileOtp((prevOtp) => [prevOtp[0], prevOtp[1], prevOtp[2], e.target.value])}
              />
            </div>
            {/* Render timer and resend button */}
            <p>Time remaining: {timer} seconds</p>
            <button type="button" onClick={handleResend} disabled={timer > 0}>
              Resend OTP
            </button>
            {/* Add other form fields */}
            <button type="submit">Verify OTP</button>
          </form>
          <button onClick={() => setStep(step - 1)}>Previous</button>
          </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default PatientRegistration;
