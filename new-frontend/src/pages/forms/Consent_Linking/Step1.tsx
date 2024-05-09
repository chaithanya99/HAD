import React, { useState, useRef } from 'react';
import { Button, Form, Input } from 'rsuite';
import FormHeader from './FormHeader';
import axios from 'axios';

const Step1 = ({ txnId, token, otpSize, step, setStep }) => {

  const retryTime = 60;
  const otpBoxReference = useRef([]);
  const [otp, setOtp] = useState(new Array(otpSize).fill(''));
  const [timeRemaining, setTimeRemaining] = useState(retryTime);
  const [timerExpired, setTimerExpired] = useState(false);

  const handleSubmit = async () => {
    try {
      if(otp.length === otpSize && otp.every((digit) => Boolean(digit))) {
        const actualOtp = otp.join('')
        console.log(actualOtp);
        const response = await axios.post('http://localhost:8080/v0.5/users/auth/confirm', {
          requestId: txnId,
          otp: actualOtp,
          display: "Step2 checking",
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data);
        setStep(step + 1);
        setOtp(new Array(otpSize).fill(''));
      }
      else {
        alert('Please enter complete OTP');
      }
    } catch(error) {
      console.error('Failed in Sending OTP :', error.message);
    }
  }

  const handleChange = (value, index) => {
    if (!isNaN(value)) {
      let newArr = [...otp];
      newArr[index] = value;
      setOtp(newArr);

      if (value && index < otpSize - 1) {
        otpBoxReference.current[index + 1].focus()
      }
    }
  }

  const handleBackspaceAndEnter = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus()
    }
  }

  const handleResend = () => {
    if(timerExpired) {
      // Ask for new OTP
      setTimeRemaining(retryTime);
      setTimerExpired(!timerExpired);
    }
  }

  return (
    <Form fluid
      onSubmit={handleSubmit}
    >
      <FormHeader
        title="OTP Validation"
        description="Enter the OTP sent to your mobile number."
      />

      <Form.Group controlId = "otp_enter">
        <Form.ControlLabel>Enter OTP</Form.ControlLabel>
        <div style={{ display: 'flex', gap: '5px' }}>
          {otp.map((digit, index) => (
          <Input 
            key={index} 
            value={digit} 
            maxLength={1}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleBackspaceAndEnter(e, index)}
            ref={(reference) => (otpBoxReference.current[index] = reference)}
            style={{ width: '35px', textAlign: 'center' }}
          />
          ))}
        </div>
      </Form.Group>

      <Form.Group>
        <Button appearance="primary" onClick={handleResend} style={{ marginRight: '10px' }}>Resend OTP</Button>
        <Button appearance="primary" type='submit'>Verify OTP</Button>
      </Form.Group>

      <Form.Group>
        <Input value={`Time remaining is ${timeRemaining} sec`} disabled style={{ textAlign: 'center',color: timerExpired ? 'red' : 'black'}} />
      </Form.Group>
    </Form>
  );
};

export default Step1;