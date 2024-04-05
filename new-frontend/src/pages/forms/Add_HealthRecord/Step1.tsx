import React, { useState } from 'react';
import { Form, Button, InputPicker } from 'rsuite';
import FormHeader from './FormHeader';
import { values } from 'lodash';

const Report = ['Diagnostic Report', 'OP consult', 'General health report', 'Wellness Record', 'Prescription', 'Immunization Record', 'Discharge Summary'].map(item => ({
  label: item,
  value: item
}));

const Step1 = ({ step, setStep, type, settype }) => {
  const handleChange = (value) => {
    settype(value);
  }

  const handleSubmit = async () => {
    console.log(step);  
    console.log(type);  
    setStep(step + 1);
  }

  return (
    <Form onChange={handleChange} onSubmit={handleSubmit}>
      <FormHeader title="Enter the type of record you want to make" />
      <Form.Group controlId="Type">
        <Form.ControlLabel>Type</Form.ControlLabel>
        <Form.Control name="Type" accepter={InputPicker} data={Report} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="submitform">
        <Button appearance="primary" type="submit" style={{ marginLeft: '10px' }}>Submit</Button>
      </Form.Group>
    </Form>
  );
};

export default Step1;
