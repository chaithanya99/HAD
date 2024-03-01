import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../misc/Navbar';
import axios from 'axios';
import './PatientRegistration.css';
import ProgressBar from './ProgressBar';

const PatientRegistration = () => {
  const otpSize = 6;
  const [step, setStep] = useState(1);
  const [aadharNumber, setAadharNumber] = useState('');
  const [otp, setOtp] = useState([]);
  const inputRefs = useRef([]);
  const [iAgree, setIAgree] = useState(false);
  const [timer, setTimer] = useState(0);
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileOtp, setMobileOtp] = useState('');
  const [txn, setTxn] = useState('B'); // A or B
  const [txnId,setTxnId] = useState('');
  const token = localStorage.getItem('token');
  // Function to handle form submission for each step
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check conditions based on the current step
    if (step === 1) {
      // Check Aadhar number and "I agree" checkbox
      if (aadharNumber.length === 14 && iAgree) {
        // Conditions met, proceed to the next step
        console.log(aadharNumber.split(' ').join(''));
        const response = await axios.post("http://localhost:8080/generateOtp", {
          "aadhaar": aadharNumber.split(' ').join('')
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setTxnId(response.data.txnId);
        console.log(response.data.txnId);
        setTimer(60);
        setOtp([])
        setStep(step + 1);
      } else {
        // Display an error message or handle invalid input
        alert('Please enter a valid Aadhar number and check the agreement.');
      }
    } else if (step === 2) {
      // Add logic for other steps if needed
      // For example, OTP verification logic
      // ...
      if (otp.length === otpSize && otp.every((digit) => Boolean(digit))) {
        const otpstring = otp.join('');
        console.log(otpstring);
        const response = await axios.post("http://localhost:8080/verifyAadhaarOTP", {
          txnId,
          "otp": otpstring
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setStep(step + 1);
        console.log(response);
      }
      else {
        alert('Please enter complete OTP');
      }
    } else if (step === 3) {
      try {
        if (mobileNumber.length === 10) {
          console.log(mobileNumber);
          const response = await axios.post("http://localhost:8080/checkAndGenerateMobileOTP", {
            txnId,
            "mobile" : mobileNumber
          }, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          console.log(response.data.mobileLinked);
          if(response.data.mobileLinked === "true")
          {
            setTxn('A');
          }
          else
          {
            setTxn('B');
          }
          setTimer(60);
          setMobileOtp([]);
          setStep(step + 1);
        }
        else {
          alert('Enter Valid Mobile Number');
        }
      } catch (error) {
        // Handle errors from the backend
        console.error('Error:', error.message);
      }
    } else if (step === 4) {
      // Step 4: Display content based on the 'txn' value
      if (txn === 'A') {
        // Mobile number already verified, display completion message
        // ...
        setStep(step + 2);
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

  const changeAadharNumber = (e) => {
    const inputValue = e.target.value;
    // Remove any non-numeric characters
    const numericValue = inputValue.replace(/\D/g, '');
    // Format the input by adding spaces after every 4 characters
    const formattedValue = numericValue.replace(/(\d{4})/g, '$1 ').trim();
    // Set the formatted value to state
    setAadharNumber(formattedValue.substring(0, 14)); // Restrict to 12 characters
  };

  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: 'center' }}> Create ABHA Number</h1>
      <div className="centered-box" style={{ textAlign: 'center' }}>
        <ProgressBar currentStage={step} />
        {/* Render form based on the current step */}
        <div className='Stage-Components'>
          {step === 1 && (
            <div className='Stage-1'>
              {/* <h2>Step 1: Aadhar Information</h2> */}
              <form onSubmit={handleSubmit}>
                <label style={{ display: 'block', marginTop: '-10px', fontSize: '20px' }}>
                  Enter Aadhar Number:
                  {/* <br></br> */}
                  <input
                    type="text"
                    value={aadharNumber}
                    onChange={changeAadharNumber}
                    style={{ marginLeft: '10px' }}
                    placeholder="XXXX XXXX XXXX"
                    maxLength={14}
                  />
                </label>
                {/* Add other form fields */}
                <br />
                <label style={{
                  marginTop: '0px',
                  width: '100%', // Set a fixed width for the label
                  textAlign: 'justify',
                  fontSize: '15px',
                  display: 'block', // Ensure it behaves like a block element
                  overflow: 'hidden', // Hide any overflow content
                  textOverflow: 'ellipsis', // Add ellipsis for overflow text
                }}>
                  <div className='TermsAndConditions'>
                    I hereby declare that I am volutuntarily sharing my Aadhaar number and demographic information issued by UIDAL, with National Health Authority (NHA) for The sole purpose of creation of ABHA number. I understand that my ABHA number can be used and shared for purposes as may be notified by ABDM from time to time including provision of healthcare services. Further, I am aware that my personal identifiable information Name, Address, Age, Date of Birth, Gender and Photographs may be made available to the entities working in the National Digital Health Ecosystem (NDHE) which inter also includes stakeholders and entities such as healthcare professionas (e.g. doctors), facilities (e.g. hospitals, laboratories) and data fiduciaries (e.g. health programmes), which are registered with or linked to the Ayushman Bharat Digital Mission (ABDM) and various processes there under. I authorize NHA to
                  </div>
                </label>
                <br />
                <label style={{ marginTop: '0px', display: 'flex', width: '100px' }}>
                  <input
                    type="checkbox"
                    checked={iAgree}
                    onChange={() => setIAgree(!iAgree)}
                  />
                  I agree
                </label>
                <br />
                <button type="submit" style={{ width: '50px' }}>Next</button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div>
              {/* <h2>Step 2: OTP Verification</h2> */}
              <p style={{ fontSize: '18px' }}>Enter the OTP sent to your mobile number linked to your Aadhar: {aadharNumber}.</p>
              <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <div>
                  {Array.from({ length: otpSize }, (_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      ref={(ref) => inputRefs.current[index] = ref}
                      value={otp[index] || ''}
                      onChange={(e) => {
                        const newOtp = [...otp];
                        const char = e.target.value
                        if (!isNaN(char) && char % 1 === 0) {
                          newOtp[index] = char
                          if (e.target.value && index < inputRefs.current.length - 1) {
                            inputRefs.current[index + 1].focus();
                          }
                        }
                        else {

                        }
                        setOtp(newOtp);

                        // Move cursor to the next input field if available
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !e.target.value && index > 0) {
                          // Move cursor to the previous input field
                          inputRefs.current[index - 1].focus();
                        }
                      }}
                      style={{
                        width: '40px', // Adjust width to make them squares
                        height: '40px', // Adjust height to make them squares
                        marginRight: '10px', // Add space between the boxes
                        textAlign: 'center', // Center the text horizontally
                        fontSize: '20px', // Adjust font size for better visibility
                      }}
                    />
                  ))}
                </div>
                {/* Render timer and resend button */}
                <p>Time remaining: {timer} seconds</p>
                <button type="button" onClick={handleResend} disabled={timer > 0}>
                  Resend OTP
                </button>
                {/* Add other form fields */}
                <button type="submit">Verify OTP</button>
              </form>
              <div style={{ fontSize: '12px', marginTop: '10px' }}>
                Wrong Aadhar Number?
                <button onClick={() => setStep(step - 1)}>Go Back</button>
              </div>
            </div>
          )}

          {/* {step === 3 && (
          <div>
            <h2>Step 3: Profile Information</h2>
            <div>
              <p>Name: {`${profileData.firstName} ${profileData.middleName} ${profileData.lastName}`}</p>
              <p>Date of Birth: {profileData.dateOfBirth}</p>
              <img src={profileData.profileImage} alt="Profile" />
            </div>
            <button type="button" onClick={() => setStep(step + 1)}>
              Next
            </button>
            <button onClick={() => setStep(step - 1)}>Previous</button>
          </div>
          )} */}

          {step === 3 && (
            <div>
              <p style={{ fontSize: '20px' }}>Enter the mobile number you want to link your ABHA Number to</p>
              <form onSubmit={handleSubmit}>
                <label style={{ display: 'block', marginTop: '-10px', fontSize: '20px' }}>
                  Mobile Number:
                  <input
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => {
                      const number = e.target.value;
                      setMobileNumber(number.replace(/\D/g, ''));
                    }}
                    maxLength={10}
                    style={{ textAlign: 'center', fontSize: '20px', marginLeft: '10px' }}
                    placeholder="Mobile Number"
                  />
                </label>
                <button type="button" onClick={handleSubmit}>
                  Next
                </button>
              </form>
              {/* Remove the below button for final */}
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
                    {Array.from({ length: otpSize }, (_, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        ref={(ref) => inputRefs.current[index] = ref}
                        value={mobileOtp[index] || ''}
                        onChange={(e) => {
                          const newOtp = [...mobileOtp];
                          newOtp[index] = e.target.value;
                          setMobileOtp(newOtp);

                          // Move cursor to the next input field if available
                          if (e.target.value && index < inputRefs.current.length - 1) {
                            inputRefs.current[index + 1].focus();
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !e.target.value && index > 0) {
                            // Move cursor to the previous input field
                            inputRefs.current[index - 1].focus();
                          }
                        }}
                        style={{
                          width: '40px', // Adjust width to make them squares
                          height: '40px', // Adjust height to make them squares
                          marginRight: '10px', // Add space between the boxes
                          textAlign: 'center', // Center the text horizontally
                          fontSize: '20px', // Adjust font size for better visibility
                        }}
                      />
                    ))}
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
      </div>
    </div>
  );
};

export default PatientRegistration;
