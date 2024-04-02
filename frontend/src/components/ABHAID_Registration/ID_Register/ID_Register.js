import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../misc/Navbar';
import Sidebar from '../../misc/Sidebar';
import axios from 'axios';
import './ID_Register.css';
import ProgressBar from '../ProgressBar/ProgressBar';
import Step1 from '../Step1/Step1';
import Step2 from '../Step2/Step2';
import Step3 from '../Step3/Step3';
import Step4 from '../Step4/Step4';

const ID_Register = () => {
  const otpSize = 6;
  const [step, setStep] = useState(1);
  const [aadharNumber, setAadharNumber] = useState('');
  const [Otp, setOtp] = useState(new Array(otpSize).fill(""));
  const OtpBoxReference = useRef([]);
  const [iAgree, setIAgree] = useState(false);
  const [timer, setTimer] = useState(0);
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileOtp, setMobileOtp] = useState('');
  const [txn, setTxn] = useState('B'); // A or B
  const [txnId, setTxnId] = useState('');
  const [abhaId, setAbhaId] = useState('');
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
        // try {
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
          setStep(step + 1);
        // }
        // catch (error) {
        //   // Handle errors from the backend
        //   console.error('Error:', error.message);
        // }
      } else {
        // Display an error message or handle invalid input
        alert('Please enter a valid Aadhar number and check the agreement.');
      }
    } else if (step === 2) {
      // Add logic for other steps if needed
      // For example, OTP verification logic
      // ...
      // if (otp.length === otpSize && otp.every((digit) => Boolean(digit))) {
      //   const otpstring = otp.join('');
      //   console.log(otpstring);
      //   const response = await axios.post("http://localhost:8080/verifyAadhaarOTP", {
      //     txnId,
      //     "otp": otpstring
      //   }, {
      //     headers: {
      //       'Authorization': `Bearer ${token}`
      //     }
      //   });
      //   setStep(step + 1);
      //   console.log(response);
      // }
      // else {
      //   alert('Please enter complete OTP');
      // }
      try {
        const actualOtp = Otp.join('')
        const response = await axios.post("http://localhost:8080/verifyAadhaarOTP", {
          txnId,
          otp: actualOtp
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setStep(step + 1);
        console.log(response.data); // Handle response accordingly

        // Proceed to the next step or handle response
      } catch (error) {
        // Handle errors from the backend
        console.error('Error:', error.message);
      }
    } else if (step === 3) {
      try {
        if (mobileNumber.length === 10) {
          console.log(mobileNumber);
          const response = await axios.post("http://localhost:8080/checkAndGenerateMobileOTP", {
            txnId,
            "mobile": mobileNumber
          }, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          console.log(response.data.mobileLinked);
          if (response.data.mobileLinked === "true") {
            const response = await axios.post("http://localhost:8080/generateHealthID", {
              txnId,
            }, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            setAbhaId(response.data.healthIdNumber);
            setTxn('A');
          }
          else {
            setTxn('B');
          }
          setTimer(60);
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
    <div className='Regpage'>
      <Sidebar />
      <div className='content'>
        <h1 style={{ textAlign: 'center' }}> Create ABHA Number</h1>
        <div className="centered-box" style={{ textAlign: 'center' }}>
          <div className='progbar'>
            <ProgressBar currentStage={step} />
          </div>
          {/* Render form based on the current step */}
          <div className='Stage-Components'>
            {step === 1 && <Step1 aadharNumber={aadharNumber} changeAadharNumber={changeAadharNumber} iAgree={iAgree} handleSubmit={handleSubmit} setIAgree={setIAgree} />}
            {step === 2 && <Step2 aadharNumber={aadharNumber} Otp={Otp} setOtp={setOtp} timer={timer} handleResend={handleResend} handleSubmit={handleSubmit} step={step} setStep={setStep} otpSize={otpSize} otpBoxReference={OtpBoxReference}/>}
            {step === 3 && <Step3 mobileNumber={mobileNumber} handleSubmit={handleSubmit} setMobileNumber={setMobileNumber} setStep={setStep} step={step} />}
            {step === 4 && <Step4 txn={txn} abhaId={abhaId} mobileOtp={mobileOtp} timer={timer} handleResend={handleResend} handleSubmit={handleSubmit} setStep={setStep} step={step} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ID_Register;
