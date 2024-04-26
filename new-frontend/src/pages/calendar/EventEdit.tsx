import React from 'react';
import { Panel, Button, FlexboxGrid, Modal } from 'rsuite';

const EventEdit = ({ open, appointment, onEdit, onDelete }) => {
  const { id, patientId, title, start, end } = appointment;

  const handleEdit = () => {
    // Call the onEdit function passed from the parent component
    onEdit(id);
  };

  const handleDelete = () => {
    // Call the onDelete function passed from the parent component
    onDelete(id);
  };

  return (
    <Modal open={open}>
      <Panel header="Appointment Details">
        <FlexboxGrid>
          <FlexboxGrid.Item colspan={12}>
            <p><strong>Patient ID:</strong> {patientId}</p>
            <p><strong>Title:</strong> {title}</p>
            <p><strong>Start:</strong> {start}</p>
            <p><strong>End:</strong> {end}</p>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={12}>
            <Button appearance="primary" onClick={handleEdit}>Edit</Button>
            <Button appearance="ghost" onClick={handleDelete}>Delete</Button>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Panel>
    </Modal>
  );
};

export default EventEdit;
