import React, { useState } from 'react';
import { Modal, Button, Form, DatePicker, ModalProps, Stack, SelectPicker } from 'rsuite';

interface EventModalProps extends ModalProps {
  onAddEvent: (event: React.MouseEvent) => void;
}

const EventAdd = (props: EventModalProps) => {
  const { onClose, open, onAddEvent, formData, setFormData, patientList, formDataReset, initialPatient, ...rest } = props;
  const [selectedPatient, setSelectedPatient] = useState(initialPatient);

  // useEffect(() => {
  //   return () => {
  //     setSelectedPatient(null);
  //   };
  // }, [onClose]);

  const resetValues = () => {
    setSelectedPatient(null);
  }

  const handleClose = () => {
    resetValues();
    formDataReset();
    onClose();
  }

  const handleAddEvent = () => {
    onAddEvent();
  }

  const handlePatientChange = (value) => {
    console.log(patientList);
    const patient = patientList.find(temp => temp.abhaNumber === value);
    console.log(patient);
    setFormData({...formData, patientId: patient.abhaNumber, patientName: patient.name, patientMobile: patient.mobile})
    setSelectedPatient({
      value: patient.abhaNumber,
      label: patient.name,
    });
  };

  return (
    <Modal open={open} onClose={handleClose} backdrop="static" {...rest}>
      <Modal.Header>
        <Modal.Title>Create a New Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form fluid>
          {/* <Form.Group controlId='title'>
            <Form.ControlLabel>Appointment Type</Form.ControlLabel>
            <SelectPicker
                value={formData.title}
                onChange={(value) => setFormData({ ...formData, title: value })}
                data={[
                  { label: 'Consultation', value: 'Consultation' },
                  { label: 'Operation', value: 'Operation' },
                ]}
            />
          </Form.Group> */}
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
          {/* <Form.Group controlId="patientId">
            <Form.ControlLabel>Patient ID</Form.ControlLabel>
            <Form.Control 
              name="patientId" 
              value={formData.patientId}
              onChange={(value) => setFormData({ ...formData, patientId: value })}
              placeholder='XX-XXXX-XXXX-XXXX'
              accepter={MaskedInput}
              mask={[
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
                /\d/,
                '-',
                /\d/,
                /\d/,
                /\d/,
                /\d/
              ]}
              readOnly
              style={{backgroundColor: '#f2f2f2', color: '#555', border: '1px solid #ccc'}}
            />
          </Form.Group> */}
          <Form.Group controlId="notes">
            <Form.ControlLabel>Notes</Form.ControlLabel>
            <Form.Control 
              name="notes" 
              value={formData.notes}
              onChange={(value) => setFormData({ ...formData, notes: value })}
            />
          </Form.Group>
          <Form.Group controlId="start">
            <Form.ControlLabel>Appointment Date</Form.ControlLabel>
            <Stack spacing={6}>
              <DatePicker
                format="yyyy-MM-dd hh:mm:ss aa"
                block
                style={{ width: 200 }}
                placeholder="Start Date"
                showMeridian={true}
                value={formData.start}
                onChange={(value) => setFormData({ ...formData, start: value })}
              />
              <DatePicker
                format="yyyy-MM-dd hh:mm:ss aa"
                block
                style={{ width: 200 }}
                placeholder="End Date"
                showMeridian={true}
                value={formData.end}
                onChange={(value) => setFormData({ ...formData, end: value })}
              />
            </Stack>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleAddEvent} appearance="primary">
          Submit
        </Button>
        <Button onClick={handleClose} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventAdd;
