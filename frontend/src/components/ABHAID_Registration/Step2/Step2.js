import React from 'react';

const Step2 = ({ aadharNumber, Otp, setOtp, timer, handleResend, handleSubmit, step, setStep }) => {

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  return (
    <div>
      <p>Enter the OTP sent to your mobile number linked to your Aadhar: {aadharNumber}.</p>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div>
          <input
            type="text"
            value={Otp}
            onChange={handleChange}
            maxLength={6} // Assuming OTP is 6 characters long
          />
          {/* Render OTP input fields */}
          {/* Render timer and resend button */}
          <p>Time remaining: {timer} seconds</p>
          <button type="button" onClick={handleResend} disabled={timer > 0}>
            Resend OTP
          </button>
          <button type="submit">Verify OTP</button>
        </div>
      </form>
      <div style={{ fontSize: '12px', marginTop: '10px' }}>
        Wrong Aadhar Number?
        <button onClick={() => setStep(step - 1)}>Go Back</button>
      </div>
    </div>
  );
};

export default Step2;
