import React, { useState } from 'react';
import { Form, ButtonToolbar, InputPicker, Button, Input, InputGroup, InputNumber } from 'rsuite';
import FormHeader from './FormHeader';
import { values } from 'lodash';

const Report = ['Diagnostic Report', 'OP consult', 'General health report', 'Wellness Record', 'Prescription', 'Immunization Record', 'Discharge Summary'].map(item => ({
  label: item,
  value: item
}));

const Step1 = ({ step, setStep, type, settype, patientId, setPatientId, doctorId, setDoctorId }) => {
  const handleChange = (value) => {
    settype(value);
  }

  const handlePatientIdChange = (value) => {
    setPatientId(value);
  }

  const handleDoctorIdChange = (value) => {
    setDoctorId(value);
  }

  const handleSubmit = async () => {
    console.log(step);  
    console.log(type);  
    console.log(patientId);
    console.log(doctorId);
    setStep(step + 1);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormHeader title="Enter the type of record you want to make" description={''} />
      <Form.Group controlId="Type">
        <Form.ControlLabel>Type</Form.ControlLabel>
        <Form.Control name="Type" accepter={InputPicker} data={Report} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="Pid">
        <Form.ControlLabel>Patient ID</Form.ControlLabel>
        <Form.Control name="Pid" accepter={InputNumber} onChange={handlePatientIdChange} />
      </Form.Group>
      {/* <Form.Group controlId="Did">
        <Form.ControlLabel>Doctor ID</Form.ControlLabel>
        <Form.Control name="Did" accepter={InputNumber} onChange={handleDoctorIdChange} />
      </Form.Group> */}
      <Form.Group controlId="submitform">
        <Button appearance="primary" type="submit" style={{ marginLeft: '10px' }}>Submit</Button>
      </Form.Group>
    </Form>
  );
};

export default Step1;
