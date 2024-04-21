import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import {
  Drawer,
  DrawerProps,
  Button,
  Form,
  Stack,
  InputNumber,
  InputGroup,
  Slider,
  Rate,
  DatePicker,
  InputPicker,
  SelectPicker,
  CheckPicker
} from 'rsuite';

const specData = ['Diagnostic Report', 'Discharge Summary', 'Health Document Record', 'Immunizatioon Record', 'Wellness Record', 'OP Consultation','Prescription'].map(item => ({
  label: item,
  value: item
}));

const genData = ['Lifetime', 'Month', 'Year'].map(item => ({
  label: item,
  value: item
}));

const DrawerView = (props: DrawerProps) => {
  const { onClose, ...rest } = props;
  const [formData, setFormData] = useState({
    abha_id: '',
    firstname: null, // From Date
    lastname: null, // To Date
    expiry: null,
    checkpicker: [], // Selected types
    inputPicker: '', // Date Range
    street: '', // Notes
  });
  const handleInputChange = (e) => {
    setFormData(e);
  };
  const handleSubmit = async () => {
    const { abha_id, firstname, lastname, expiry, checkpicker, inputPicker } = formData;

    const consent = {
      purpose: {
        text: 'string', // Replace with actual purpose text
        code: 'CAREMGT',
      },
      patient: {
        id: abha_id, // Assuming abha_id field holds patient ID
      },
      hiu: {
        id: 'IN0610089593', // Hardcoded HIU ID (replace if needed)
      },
      requester: {
        name: 'Dr. Pratham Rao', // Hardcoded requester name (replace if needed)
        identifier: {
          type: 'REGNO',
          value: 'MH1001',
          system: 'https://www.nvidia.org', // Hardcoded requester system (replace if needed)
        },
      },
      hiTypes: checkpicker, // Selected types from "Purpose of request"
      permission: {
        accessMode: 'VIEW', // Hardcoded access mode (replace if needed)
        dateRange: {
          from: firstname,
          to: lastname,
        },
        dataEraseAt: expiry, // Hardcoded data erase at (replace if needed)
        frequency: {
          unit: 'HOUR',
          value: 1,
          repeats: 0,
        },
      },
    };

    try {
      console.log('function triggered');

      // 1. Get authorization token (replace with your actual endpoint)
      const tokenResponse = await axios.post('http://localhost:8080/auth/generateToken', {
        username: 'admin',
        password: 'admin',
      });

      const token = tokenResponse.data;

      // 2. Send POST request with consent object in body
      const response = await axios.post(
        'http://localhost:8080/doctor/init-consent',
        consent,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle success response
      if (response.status >= 200 && response.status < 300) {
        console.log('values are being set now');
        console.log(response.data);
        setFormData({
          ...formData,
          // Reset form data as needed
        });
      }
    } catch (error) {
      // Handle error
      toast('Error: Unable to create consent request. Please try again later.');
    } finally {
      // Perform any cleanup actions
    }
  };
  return (
    <Drawer backdrop="static" size="sm" placement="right" onClose={onClose} {...rest}>
      <Drawer.Header>
        <Drawer.Title>Create Consent Request</Drawer.Title>
        <Drawer.Actions>
          <Button onClick={handleSubmit} appearance="primary">
            Confirm
          </Button>
          <Button onClick={onClose} appearance="subtle">
            Cancel
          </Button>
        </Drawer.Actions>
      </Drawer.Header>

      <Drawer.Body>
        <Form 
        fluid
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        formValue={formData}>
          <Form.Group>
            <Form.ControlLabel>ABHA Address</Form.ControlLabel>
            <Form.Control name="abha_id" type="abha_id" />
          </Form.Group>
          <Stack justifyContent="space-between" style={{ marginBottom: 20 }}>
            <Form.Group>
              <Form.ControlLabel>From Date</Form.ControlLabel>
              <Form.Control name="firstname" style={{ width: 200 }} accepter={DatePicker}/>
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>To Date</Form.ControlLabel>
              <Form.Control name="lastname" style={{ width: 200 }} accepter={DatePicker}/>
            </Form.Group>
          </Stack>
          <Form.Group>
            <Form.ControlLabel>Expiry</Form.ControlLabel>
            <Form.Control name="expiry" style={{ width: 200}} accepter={DatePicker}/>
          </Form.Group>
          <Form.Group controlId="checkpicker">
            <Form.ControlLabel>Purpose of request</Form.ControlLabel>
            <Form.Control name="checkpicker" accepter={CheckPicker} data={specData} style={{width:'100%'}}/>
          </Form.Group>
          <Form.Group controlId="inputPicker">
            <Form.ControlLabel>Date Range</Form.ControlLabel>
            <Form.Control name="inputPicker" accepter={InputPicker} data={genData} style={{width:'100%'}}/>
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Notes</Form.ControlLabel>
            <Form.Control name="street" />
          </Form.Group>

          {/* <Form.Group>
            <Form.ControlLabel>Rating</Form.ControlLabel>
            <Form.Control name="rating" accepter={Rate} />
          </Form.Group> */}

          {/* <Form.Group>
            <Form.ControlLabel>Skill Proficiency</Form.ControlLabel>
            <Form.Control name="skill" accepter={Slider} progress />
          </Form.Group> */}

          {/* <Form.Group>
            <Form.ControlLabel>Income</Form.ControlLabel>
            <InputGroup style={{ width: '100%' }}>
              <InputGroup.Addon>$</InputGroup.Addon>
              <Form.Control name="income" accepter={InputNumber} style={{ width: '100%' }} />
            </InputGroup>
          </Form.Group> */}
        </Form>
      </Drawer.Body>
    </Drawer>
  );
};

export default DrawerView;
