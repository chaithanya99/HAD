import React, { useState } from 'react';
import { Form, ButtonToolbar, InputPicker, Button, Input, InputGroup, InputNumber, SelectPicker } from 'rsuite';
import FormHeader from './FormHeader';

const Report = ['Diagnostic Report', 'OP consult', 'General health report', 'Wellness Record', 'Prescription', 'Immunization Record', 'Discharge Summary'].map(item => ({
  label: item,
  value: item
}));

const Step1 = ({ step, setStep, type, settype, patientId, setPatientId, doctorId, setDoctorId, patientList, initialPatient }) => {
  const [selectedPatient, setSelectedPatient] = useState(initialPatient? {
    value: initialPatient.abhaNumber,
    label: initialPatient.name,
  }: null);
  const handleChange = (value) => {
    settype(value);
  }

  const handlePatientChange = (value) => {
    console.log(patientList);
    const patient = patientList.find(temp => temp.abhaNumber === value);
    console.log(patient);
    setPatientId(patient.id);
    setSelectedPatient({
      value: patient.abhaNumber,
      label: patient.name,
    });
  };

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
        <Form.ControlLabel>Patient</Form.ControlLabel>
        <SelectPicker
            searchable={true}
            cleanable={false}
            value={selectedPatient ? selectedPatient.value : null}
            onChange={handlePatientChange}
            data={patientList.map(patient => ({
              value: patient.abhaNumber,
              label: patient.name,
            }))}
            placeholder="Select Patient"
            style={{marginBottom: '20px'}}
          />
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
