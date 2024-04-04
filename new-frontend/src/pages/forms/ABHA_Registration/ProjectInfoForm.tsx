import React from 'react';
import { Form, Stack, InputGroup,Input,Button,MaskedInput} from 'rsuite';
import { Icon } from '@rsuite/icons';
import { VscLock, VscWorkspaceTrusted } from 'react-icons/vsc';
import RadioTile from '@/components/RadioTile';
import Textarea from '@/components/Textarea';
import FormHeader from './FormHeader';
import { useState, useEffect,useRef} from 'react';

const ProjectInfoForm = () => {
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [timerExpired, setTimerExpired] = useState(false);

  const inputs = useRef([]);

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


  const focusNextInput = (index) => {
    if (inputs.current[index + 1]) {
      inputs.current[index + 1].focus();
    }
  };


  return (
    <Form fluid>
      <FormHeader
        title="OTP Validation"
        description="Enter the OTP sent to your mobile number to generate your ABHA Number."
      />
      <Form.Group controlId="aadhaar_display">
        <Form.ControlLabel>Your Aadhaar Number is:</Form.ControlLabel>
        <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}>7789-4468-91-5554</div>
      </Form.Group>

      <Form.Group controlId = "otp_enter">
          <Form.ControlLabel>Enter OTP</Form.ControlLabel>
          <div style={{ display: 'flex', gap: '5px' }}>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <Input
                key={index}
                inputRef={(ref) => inputs.current[index] = ref}
                style={{ width: '35px', textAlign: 'center' }}
                maxLength={1}
                onChange={(value) => {
                  if (value && value.length === 1) {
                    focusNextInput(index);
                  }
                }}
              />
            ))}
          </div>
        </Form.Group>

      <Form.Group>
          <Button appearance="primary" style={{ marginRight: '10px' }}>Resend OTP</Button>
          <Button appearance="primary">Verify OTP</Button>
      </Form.Group>

      <Form.Group>
      <Input value={`Time remaining is ${timeRemaining} sec`} disabled style={{ textAlign: 'center',color: timerExpired ? 'red' : 'black'}} />
      </Form.Group>

    </Form>
  );
};

export default ProjectInfoForm;
