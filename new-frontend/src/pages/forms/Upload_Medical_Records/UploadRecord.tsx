import PageContent from '@/components/PageContent';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Divider, Form, Message, Modal, SelectPicker, Uploader } from 'rsuite';

const Report = ['Diagnostic Report', 'OP consult', 'General health report', 'Wellness Record', 'Prescription', 'Immunization Record', 'Discharge Summary'].map(item => ({
  label: item,
  value: item
}));

const UploadRecord = () => {
  const location = useLocation();

  // Extracting Initial Data
  const initialSelectedPatient = location.state ? location.state.selectedPatient : null;

  const [patientList, setPatientList] = useState([]);
  const [patientId, setPatientId] = useState();
  const [pdfFile, setPdfFile] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(initialSelectedPatient);
  const [formType, setFormType] = useState(null);
  const [key, setKey] = useState(0);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/patients', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setPatientList(response.data);
      } catch(error) {
        console.error('Fetching Patients Failed: ', error.message);
      }
    };

    fetchPatients();
  }, []);

  const resetValues = () => {
    setSelectedPatient(null);
    setFormType(null);
    setKey(key+1);
  };

  const handleSubmit = async () => {
    if(!pdfFile || !selectedPatient || !formType) {
      alert('Incomplete Form Contents');
      console.log(selectedPatient, formType);
    }
    else {
      const formData = new FormData();
      formData.append('pdf', pdfFile); // Append the PDF file
      formData.append('AbhaNumber', selectedPatient.value);
      try {
        const response = axios.post('http://localhost:8080/HealthRecord/upload', formData, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            }
          }
        );
        resetValues();
      } catch(error) {
        console.error('Upload File to Backend Failed: ', error.message);
      }
    }
  };

  const handleClear = () => {

  };

  const handlePatientChange = (value) => {
    const patient = patientList.find(temp => temp.abhaNumber === value);
    setSelectedPatient({
      value: patient.abhaNumber,
      label: patient.name,
    });
    setPatientId(patient.id);
  }

  return (
    <PageContent>
      <Message>
        Form for Uploading Medical Records
      </Message>

      <Divider/>

      <Form>
        <Form.Group controlId='selectPatient'>
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

        <Form.Group controlId='selectFormType'>
          <Form.ControlLabel>Medical Record Type</Form.ControlLabel>
          <SelectPicker
            searchable={true}
            cleanable={false}
            value={formType}
            onChange={(value) => {setFormType(value)}}
            data={Report}
            placeholder="Select Medical Record Type"
            style={{marginBottom: '20px'}}
          />
        </Form.Group>
        
        <Form.Group controlId='uploadRecord'>
            <Form.ControlLabel>Upload Medical Record</Form.ControlLabel>
            <Uploader
              action={''}
              accept={'application/pdf'}
              key={key}
              autoUpload={false}
              draggable={true}
              multiple={false}
              style={{marginBottom: '20px'}}
              onChange={file => {
                setPdfFile(file[0].blobFile);
              }}
            />
        </Form.Group>
      </Form>

      <Button onClick={handleSubmit} appearance="primary">
        Submit
      </Button>
      <Button onClick={handleClear} appearance="subtle">
        Clear
      </Button>
    </PageContent>
  );
};

export default UploadRecord;