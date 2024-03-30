import React from 'react';

const Step4 = ({ txn, abhaId, mobileOtp, timer, handleResend, handleSubmit, setStep, step }) => {
  return (
    <div>
      <h2>Step 4: Final Step</h2>
      {/* Render content based on 'txn' value */}
      {txn === 'A' ? (
        <><p>Verification process completed. Display completion message here.</p><p>ABHA ID: {abhaId}</p></>
      ) : txn === 'B' ? (
        <div>
          <h3>Step 4: OTP Verification</h3>
          <p>Enter the OTP sent to your mobile number.</p>
          <form onSubmit={handleSubmit}>
            {/* Render OTP input fields */}
            {/* Render timer and resend button */}
            <p>Time remaining: {timer} seconds</p>
            <button type="button" onClick={handleResend} disabled={timer > 0}>
              Resend OTP
            </button>
            <button type="submit">Verify OTP</button>
          </form>
          <button onClick={() => setStep(step - 1)}>Previous</button>
        </div>
      ) : null}
    </div>
  );
};

export default Step4;
