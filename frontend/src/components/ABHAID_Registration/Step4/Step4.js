import React from 'react';
import './Step4.css'

const Step4 = ({ txn, abhaId, mobileOtp, timer, handleResend, handleSubmit, setStep, step, mobileNumber, Otp, setOtp, otpSize, otpBoxReference }) => {

  function handleChange(value, index) {
    if(!isNaN(value)) {
      let newArr = [...Otp];
      newArr[index] = value;
      setOtp(newArr);

      if(value && index < otpSize-1){
        otpBoxReference.current[index + 1].focus()
      }
    }
  }

  function handleBackspaceAndEnter(e, index) {
    if(e.key === "Backspace" && !e.target.value && index > 0){
      otpBoxReference.current[index - 1].focus()
    }
    if(e.key === "Enter" && e.target.value && index < otpSize-1){
      otpBoxReference.current[index + 1].focus()
    }
  }

  return (
    <div className='Stage-4'>
      {/* <h2>Step 4: Final Step</h2>
      Render content based on 'txn' value
      {txn === 'A' ? (
        <><p>Verification process completed. Display completion message here.</p><p>ABHA ID: {abhaId}</p></>
      ) : txn === 'B' ? (
        <div>
          <h3>Step 4: OTP Verification</h3>
          <p>Enter the OTP sent to your mobile number.</p>
          <form onSubmit={handleSubmit}>
            Render OTP input fields
            Render timer and resend button
            <p>Time remaining: {timer} seconds</p>
            <button type="button" onClick={handleResend} disabled={timer > 0}>
              Resend OTP
            </button>
            <button type="submit">Verify OTP</button>
          </form>
          <button onClick={() => setStep(step - 1)}>Previous</button>
        </div>
      ) : null} */}
      <p>Enter the OTP sent to your mobile number: {mobileNumber}</p>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div className='Otp'>
          {Otp.map((digit, index)=>(
            <input key={index} value={digit} maxLength={1}  
            onChange={(e)=> handleChange(e.target.value, index)}
            onKeyUp={(e)=> handleBackspaceAndEnter(e, index)}
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
        Wrong Mobile Number?
        <button onClick={() => {
          setStep(step - 1);
          setOtp(new Array(otpSize).fill(""));
          }}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Step4;
