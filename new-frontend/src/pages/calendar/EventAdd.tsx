import React from 'react';
import { Modal, Button, Form, DatePicker, ModalProps, Stack, MaskedInput } from 'rsuite';

interface EventModalProps extends ModalProps {
  onAddEvent: (event: React.MouseEvent) => void;
}

const EventAdd = (props: EventModalProps) => {
  const { onClose, open, onAddEvent, formData, setFormData, ...rest } = props;

  return (
    <Modal open={open} onClose={onClose} backdrop="static" {...rest}>
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
          <Form.Group controlId="patientId">
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
            />
          </Form.Group>
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
        <Button onClick={onAddEvent} appearance="primary">
          Submit
        </Button>
        <Button onClick={onClose} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventAdd;
