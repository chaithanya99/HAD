import React, { useState } from 'react';
import { Form, Stack,MaskedInput, Checkbox, Panel, Button} from 'rsuite';
import RadioTile from '@/components/RadioTile';
import { Icon } from '@rsuite/icons';
import { VscNotebookTemplate, VscRepoClone, VscFile } from 'react-icons/vsc';
import FormHeader from './FormHeader';
import {SchemaModel, StringType} from "schema-typed";
import PageNextIcon from '@rsuite/icons/PageNext';
import axios from 'axios';

const TermsAndConditions = () => (
  <Panel bordered style={{ maxHeight: 'fit-content',overflowY: 'visible',border: '1px solid #ccc' }}>
    <p>
    I, hereby declare that I am voluntarily sharing my Aadhaar number and demographic information issued by UIDAI, 
    with National Health Authority (NHA) for the sole purpose of creation of ABHA number. I understand that my ABHA 
    number can be used and shared for purposes as may be notified by ABDM from time to time including provision of 
    healthcare services. Further, I am aware that my personal identifiable information (Name, Address, Age, Date of Birth, 
    Gender and Photograph) may be made available to the entities working in the National Digital Health Ecosystem (NDHE) 
    which inter alia includes stakeholders and entities such as healthcare professionals (e.g. doctors), facilities (e.g. 
    hospitals, laboratories) and data fiduciaries (e.g. health programmes), which are registered with or linked to the 
    Ayushman Bharat Digital Mission (ABDM), and various processes there under. I authorize NHA to use my Aadhaar number 
    for performing Aadhaar based authentication with UIDAI as per the provisions of the Aadhaar (Targeted Delivery of 
    Financial and other Subsidies, Benefits and Services) Act, 2016 for the aforesaid purpose. I understand that UIDAI 
    will share my e-KYC details, or response of “Yes” with NHA upon successful authentication. I have been duly informed about the 
    option of using other IDs apart from Aadhaar; however, I consciously choose to use Aadhaar number for the purpose of availing 
    benefits across the NDHE. I am aware that my personal identifiable information excluding Aadhaar number / VID number can be 
    used and shared for purposes as mentioned above. I reserve the right to revoke the given consent at any point of time as 
    per provisions of Aadhaar Act and Regulations.
    </p>

  </Panel>
);

const Step1 = ({ setAadharNumber, aadharNumber, token, setTxnId, step, setStep }) => {
  const formRef = React.useRef(null);
  const [Agree, setAgree] = useState(false);

  const handleChange = (e) => {
    setAadharNumber(e.MaskedInput);
  }

  const handleSubmit = async () => {
    const actualAadharNumber = aadharNumber.split('-').join('').trim();
    console.log(actualAadharNumber.length);
    if (actualAadharNumber.length === 12 && Agree) {
      // Conditions met, proceed to the next step
      // try {
      const response1 = await axios.post("http://localhost:8080/auth/generateToken",
      {
        "username" : "admin",
        "password": "admin"
      });
      localStorage.setItem('token', response1.data);
      const response = await axios.post("http://localhost:8080/generateOtp", {
        "aadhaar": actualAadharNumber
      }, {
        headers: {
          'Authorization': `Bearer ${response1.data}`
        }
      });
      setTxnId(response.data.txnId);
      console.log(response.data.txnId);
      setStep(step + 1);
      // }
      // catch (error) {
      //   // Handle errors from the backend
      //   console.error('Error:', error.message);
      // }
    } 
    else {
      // Display an error message or handle invalid input
      if(actualAadharNumber.length != 12) {
        alert('Please enter valid Aadhar number');
      }
      else if (Agree === false) {
        alert('Please read & agree to the Terms & Conditions');
      }
      else {
        alert('IDK Die');
      }
    }
  }

  return (
    <Form
    ref={formRef}
    onChange={handleChange}
    onSubmit={handleSubmit}
    >
      <FormHeader
        title="Enter your Aadhaar Number"
        description="Your Aadhaar number will be used for user authentication and generation of your ABHA Number."
      />
        <Form.Group controlId="MaskedInput">
          <Form.ControlLabel>Enter Aadhaar Number</Form.ControlLabel>
          <Form.Control
            name="MaskedInput"
            accepter={MaskedInput}
            placeholder="XXXX - XXXX - XXXX"
            placeholderChar = {'\u2000'}
            mask={[
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              '-',
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              '-',
              /\d/,
              /\d/,
              /\d/,
              /\d/
            ]}
          />
        </Form.Group>

      <Form.Group controlId="termsAndConditions">
        <Form.ControlLabel>Terms and Conditions</Form.ControlLabel>
        <TermsAndConditions />
        <Checkbox onChange={() => setAgree(!Agree)} style={{marginBottom: '2px'}}>Accept Terms and Conditions</Checkbox>
      </Form.Group>
      <Button appearance="primary" type="submit" style={{ marginLeft: '10px'}}>Submit</Button>
    </Form>
  );
};

export default Step1;
