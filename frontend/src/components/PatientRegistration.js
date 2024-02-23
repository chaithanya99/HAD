import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import './PatientRegistration.css';
import ProgressBar from './ProgressBar';

const PatientRegistration = () => {
  const optSize = 6;
  const [step, setStep] = useState(1);
  const [aadharNumber, setAadharNumber] = useState('');
  const [otp, setOtp] = useState([]);
  const inputRefs = useRef([]);
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
      if (aadharNumber.length === 14 && iAgree) {
        // Conditions met, proceed to the next step
        const actualAadharNumber = aadharNumber.split(' ').join('')
        console.log(actualAadharNumber);
        setStep(step + 1);
      } else {
        // Display an error message or handle invalid input
        alert('Please enter a valid Aadhar number and check the agreement.');
      }
    } else if (step === 2) {
      // Add logic for other steps if needed
      // For example, OTP verification logic
      // ...
      if (otp.length === optSize && otp.every((digit) => Boolean(digit))) {
        // res = axios.post()
        // if(res == "OTP Verified") {
        //   setStep(step + 1);
        // }
        // else {
        //   alert('Wrong OTP');
        // }
        setStep(step + 1);
      }
      else {
        alert('Please enter complete OTP');
      }
      // Proceed to the next step
      console.log(otp)
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
      <Navbar/>
      <div className="centered-box" style={{textAlign:'center'}}>
        <ProgressBar currentStage={step}/>
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
              I hereby declare that I am utuntarily sharing my Aadhaar humber and demographic information issued by UIDAL, with National Health Authority (NHA) for The sole purpose of cration of ABHA number. understand I that my ABHA number can te usand and shared for purposes as may be notified by ABDM Rom time to tome including provision of healthcare services. Further, tam aware that my personal identifiable information Name, Address, Age, Date of Beth, Gender and Photographs may be made avslate to the edities working in the National Digital Health Ecosystem (NDH) which inter als includes stalkenclders and entities such as healthcare professionas je docton), facilities in g hospitan, laboratorienst and data fiduciaries in g heath programmes, which are registered with or linked to the Ayushman Bharat Digital MABOM and various processes there under authorize NHA to
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
              <button type="submit" style={{width: '50px'}}>Next</button>
            </form>
          </div>
          )}

          {step === 2 && (
          <div>
            {/* <h2>Step 2: OTP Verification</h2> */}
            <p style={{fontSize:'20px'}}>Enter the OTP sent to your mobile number.</p>
            <form onSubmit={handleSubmit} style={{marginBottom:'20px'}}>
              <div>
                {Array.from({ length: optSize }, (_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    ref={(ref) => inputRefs.current[index] = ref}
                    value={otp[index] || ''}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[index] = e.target.value;
                      setOtp(newOtp);

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
                    style={{width: '10%'}}
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
            <div style={{fontSize:'12px', marginTop:'10px'}}>
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
      </div>
    </div>
  );
};

export default PatientRegistration;
