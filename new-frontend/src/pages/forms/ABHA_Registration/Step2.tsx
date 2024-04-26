import React from 'react';
import { Form, Input, Button } from 'rsuite';
import { Icon } from '@rsuite/icons';
import { VscLock, VscWorkspaceTrusted } from 'react-icons/vsc';
import RadioTile from '@/components/RadioTile';
import Textarea from '@/components/Textarea';
import FormHeader from './FormHeader';
import { useState, useEffect,useRef} from 'react';
import axios from 'axios';

const Step2 = ({ otpSize, txnId, step, setStep, aadharNumber, token, retryTime }) => {
  const formRef = React.useRef(null);
  const otpBoxReference = useRef([]);
  const [otp, setOtp] = useState(new Array(otpSize).fill(''))
  const [timeRemaining, setTimeRemaining] = useState(retryTime);
  const [timerExpired, setTimerExpired] = useState(false);

  const handleSubmit = async () => {
    try {
      if (otp.length === otpSize && otp.every((digit) => Boolean(digit))) {
        const actualOtp = otp.join('')
        console.log(actualOtp);
        const response = await axios.post("http://localhost:8080/verifyAadhaarOTP", {
          txnId,
          otp: actualOtp
        }, {
          headers: {
            'Authorization': `Bearer ${token}`  // token
          }
        });
        console.log(response.data); // Handle response accordingly
        setStep(step + 1);
        setOtp(new Array(otpSize).fill(''));
      }
      else {
        alert('Please enter complete OTP');
      }

      // Proceed to the next step or handle response
    } catch (error) {
      // Handle errors from the backend
      console.error('Error:', error.message);
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => Math.max(prevTime - 1, 0)); // Ensure timeRemaining is never below zero
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  useEffect(() => {
    if (timeRemaining === 0) {
      setTimerExpired(true);
    }
  }, [timeRemaining]);

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

  const handleResend = () => {
    if(timerExpired) {
      // Ask for new OTP
      setTimeRemaining(retryTime);
      setTimerExpired(!timerExpired);
    }
  }

  const handleBackspaceAndEnter = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus()
    }
  }

  return (
    <Form fluid
    ref={formRef}
    onSubmit={handleSubmit}
    >
      <FormHeader
        title="OTP Validation"
        description="Enter the OTP sent to your Aadhar linked mobile number to verify your Aadhar Number."
      />
      <Form.Group controlId="aadhaar_display">
        <Form.ControlLabel>Your Aadhaar Number is:</Form.ControlLabel>
        <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}>{aadharNumber}</div>
      </Form.Group>

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

      <Form.Group style={{ display: 'flex', alignItems: 'center' }}>
          <p>Wrong Aadhar Number?</p>
          <Button appearance="primary" onClick={() => {setStep(step-1)}} style={{ marginLeft: '10px' }}>Go Back</Button>
      </Form.Group>

    </Form>
  );
};

export default Step2;
