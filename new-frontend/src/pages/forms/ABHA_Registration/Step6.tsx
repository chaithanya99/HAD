import React, { useRef, useState } from 'react';
import { Form, Stack, SelectPicker,Input,InputGroup,MaskedInput,Button,Panel, ButtonToolbar} from 'rsuite';
import { useNavigate } from 'react-router-dom';

import FormHeader from './FormHeader';
import axios from 'axios';

const Step6 = ({ abhaId, token }) => {
  const formRef = useRef(null);
  const [abhaAddr, setAbhaAddr] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
        const response = await axios.post("http://localhost:8080/addAddress", {
          "abhaNum": abhaId,
          "abhaAddr": abhaAddr
        }, {
          headers: {
            'Authorization': `Bearer ${token}`  // token
          }
        });
        console.log(response);
    } catch (error) {
      // Handle errors from the backend
      console.error('Error:', error);
    }
  }

  const handleChange = (e) => {
    setAbhaAddr(e.MaskedInput);
  }

  return (
    <Form fluid
    ref={formRef}
    onChange={handleChange}
    onSubmit={handleSubmit}
    >
      <FormHeader
        title="Linking ABHA Address"
        description="Please enter the ABHA address that you want to link to your ABHA ID."
      />
      <Form.Group controlId="MaskedInput">
        <Form.ControlLabel>Enter Your ABHA Address</Form.ControlLabel>
          <InputGroup style={{width: 300, marginBottom: 10}}>
          <Form.Control name="MaskedInput" placeholder="your id@sbx"/>
        </InputGroup>
        <Button appearance="primary" type="submit" style={{ marginLeft: '10px'}}>Submit</Button>
        <ButtonToolbar style={{ marginTop: 20 }}>
        <Button appearance="primary" onClick={() => {navigate('/dashboard')}}>Return to Dashboard</Button>
        </ButtonToolbar>
      </Form.Group>

    </Form>
  );
};

export default Step6;
