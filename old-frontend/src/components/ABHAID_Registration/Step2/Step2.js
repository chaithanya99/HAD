import React from 'react';
import './Step2.css'

const Step2 = ({ aadharNumber, Otp, setOtp, timer, handleResend, handleSubmit, step, setStep, otpSize, otpBoxReference }) => {

  function handleChange(value, index) {
    if (!isNaN(value)) {
      let newArr = [...Otp];
      newArr[index] = value;
      setOtp(newArr);

      if (value && index < otpSize - 1) {
        otpBoxReference.current[index + 1].focus()
      }
    }
  }

  function handleBackspaceAndEnter(e, index) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus()
    }
    if (e.key === "Enter" && e.target.value && index < otpSize - 1) {
      otpBoxReference.current[index + 1].focus()
    }
  }

  return (
    <div className='Stage-2'>
      <p>Enter the OTP sent to your Aadhar linked mobile number</p>
      <p1>Aadhaar Number: {aadharNumber}</p1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div className='Otp'>
          {Otp.map((digit, index) => (
            <input key={index} value={digit} maxLength={1}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
              ref={(reference) => (otpBoxReference.current[index] = reference)}
            />
          ))}
          <p1>Time remaining: {timer} seconds</p1>
          <button type="button" onClick={handleResend} disabled={timer > 0}>
            Resend OTP
          </button>
          <button type="submit">Verify OTP</button>
        </div>
      </form>
      <div className='Back' style={{ fontSize: '12px', marginTop: '10px' }}>
        Wrong Aadhar Number?
        <button onClick={() => {
          setStep(step - 1);
          setOtp(new Array(otpSize).fill(""));
        }}>Go Back</button>
      </div>
    </div>
  );
};

export default Step2;
