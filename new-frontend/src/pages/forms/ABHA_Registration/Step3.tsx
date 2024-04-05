import React, { useRef, useState } from 'react';
import { Form, Stack, SelectPicker,Input,InputGroup,MaskedInput,Button,Panel} from 'rsuite';
import RadioTile from '@/components/RadioTile';
import { Icon } from '@rsuite/icons';
import { FaGit, FaGithub, FaGitlab } from 'react-icons/fa';

import FormHeader from './FormHeader';
import axios from 'axios';

const Step3 = ({ mobileNumber, setMobileNumber, txnId, token, setAbhaId, step, setStep }) => {
  const formRef = useRef(null);

  const handleSubmit = async () => {
    try {
      const actualMobileNumber = mobileNumber.split(' ').join('').trim();
      console.log(actualMobileNumber.length)
      if (actualMobileNumber.length === 10) {
        const token1 = localStorage.getItem('token');
        const response = await axios.post("http://localhost:8080/checkAndGenerateMobileOTP", {
          txnId,
          "mobile": actualMobileNumber
        }, {
          headers: {
            'Authorization': `Bearer ${token1}` // token
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
          setStep(step + 2);
        }
        else {
          setStep(step + 1);
        }
      }
      else {
        alert('Enter Valid Mobile Number');
      }
    } catch (error) {
      // Handle errors from the backend
      console.error('Error:', error.message);
    }
  }

  const handleChange = (e) => {
    setMobileNumber(e.MaskedInput);
  }

  return (
    <Form fluid
    ref={formRef}
    onChange={handleChange}
    onSubmit={handleSubmit}
    >
      <FormHeader
        title="Linking Mobile Number"
        description="Please enter the mobile numeber that you want to link to your ABHA ID."
      />
      <Form.Group controlId="MaskedInput">
        <Form.ControlLabel>Enter Your Mobile Number</Form.ControlLabel>
          <InputGroup style={{width: 300, marginBottom: 10}}>
            <InputGroup.Addon>+91</InputGroup.Addon>
            <Form.Control
              name="MaskedInput"
              accepter={MaskedInput}
              placeholder = 'XX XXX XXXXX'
              placeholderChar = {'\u2000'}
              mask={[
                /\d/,
                /\d/,
                ' ',
                /\d/,
                /\d/,
                /\d/,
                ' ',
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
              ]}
            />
        </InputGroup>
        <Button appearance="primary" type="submit" style={{ marginLeft: '10px'}}>Submit</Button>
      </Form.Group>

    </Form>
  );
};

export default Step3;
