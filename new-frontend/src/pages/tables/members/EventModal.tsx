import React from 'react';
import { Modal, Button, Form, DatePicker, ModalProps, Stack, Checkbox } from 'rsuite';

interface EventModalProps extends ModalProps {
  onAddEvent: (event: React.MouseEvent) => void;
}

const EventModal = (props: EventModalProps) => {
  const { onClose, open, onAddEvent, ...rest } = props;
  return (
    <Modal open={open} onClose={onClose} backdrop="static" {...rest}>
      <Modal.Header>
        <Modal.Title>Create a New Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form fluid>
          <Form.Group controlId="name">
            <Form.ControlLabel>Patient ID</Form.ControlLabel>
            <Form.Control name="name" />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.ControlLabel>Notes</Form.ControlLabel>
            <Form.Control name="description" />
          </Form.Group>
          <Form.Group controlId="start">
            <Form.ControlLabel>Event Date</Form.ControlLabel>
            <Stack spacing={6}>
              <DatePicker
                format="yyyy-MM-dd HH:mm:ss"
                block
                style={{ width: 200 }}
                placeholder="Start Date"
              />
              <DatePicker
                format="yyyy-MM-dd HH:mm:ss"
                block
                style={{ width: 200 }}
                placeholder="End Date"
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
