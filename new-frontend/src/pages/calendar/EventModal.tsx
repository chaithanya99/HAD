import React, { useEffect } from 'react';
import { Modal, Button, Form, DatePicker, ModalProps, Stack, SelectPicker } from 'rsuite';

interface EventModalProps extends ModalProps {
  onAddEvent: (event: React.MouseEvent) => void;
}

const EventModal = (props: EventModalProps) => {
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
          <Form.Group controlId="name">
            <Form.ControlLabel>Patient ID</Form.ControlLabel>
            <Form.Control 
              name="name" 
              value={formData.name}
              onChange={(value) => setFormData({ ...formData, name: value })}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.ControlLabel>Notes</Form.ControlLabel>
            <Form.Control 
              name="description" 
              value={formData.description}
              onChange={(value) => setFormData({ ...formData, description: value })}
            />
          </Form.Group>
          <Form.Group controlId="start">
            <Form.ControlLabel>Event Date</Form.ControlLabel>
            <Stack spacing={6}>
              <DatePicker
                format="yyyy-MM-dd HH:mm:ss"
                block
                style={{ width: 200 }}
                placeholder="Start Date"
                value={formData.start}
                onChange={(value) => setFormData({ ...formData, start: value })}
              />
              <DatePicker
                format="yyyy-MM-dd HH:mm:ss"
                block
                style={{ width: 200 }}
                placeholder="End Date"
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

export default EventModal;
