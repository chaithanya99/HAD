import React, { useState } from 'react';
import { Panel, Button, FlexboxGrid, Modal, ModalProps, Form, Stack, DatePicker, List } from 'rsuite';

interface EventModalProps extends ModalProps {
  onAddEvent: (event: React.MouseEvent) => void;
}

const EventEdit = (props: EventModalProps) => {
  const { open, appointment, onEdit, onDelete, onClose, ...rest } = props;
  const [realEdit, setRealEdit] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    start: appointment.start,
    end: appointment.end,
    id: appointment.id,
    notes: appointment.notes,
  });

  const toggleEdit = () => {
    setRealEdit(!realEdit);
  }

  function formatDateWithAMPM(date) {
    // Get the day, month, year, hours, minutes, and seconds from the Date object
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    // Determine if it's AM or PM
    const period = hours >= 12 ? 'PM' : 'AM';
    
    // Convert hours from 24-hour format to 12-hour format
    const formattedHours = hours % 12 || 12;
  
    // Concatenate the formatted date, time, and AM/PM parts
    const formattedDate = `${day}-${month}-${year} ${formattedHours}:${minutes}:${seconds} ${period}`;
  
    return formattedDate;
  }

  return (
    // <Modal open={open} style={{ display: 'flex', flexDirection: 'column' }} onClose={onClose}>
    //   <Modal.Header>
    //     <Modal.Title style={{ textAlign: 'center', marginBottom: '20px', fontSize: '25px' }}>Appointment Details</Modal.Title>
    //   </Modal.Header>
    //   <FlexboxGrid style={{ justifyContent: 'center' }}>
    //     <FlexboxGrid.Item colspan={12}>
    //       <List bordered style={{ borderWidth: '7px' }}>
    //         <List.Item>
    //           <span>
    //             <b><strong>Patient ID:</strong></b> {appointment.patientId}
    //           </span>
    //         </List.Item>
    //         <List.Item>
    //           <span>
    //             <b><strong>Start:</strong></b> {appointment.start.toISOString()}
    //           </span>
    //         </List.Item>
    //         <List.Item>
    //           <span>
    //             <b><strong>Start:</strong></b> {appointment.end.toISOString()}
    //           </span>
    //         </List.Item>
    //       </List>
    //     </FlexboxGrid.Item>
    //   </FlexboxGrid>
    //   <FlexboxGrid style={{margin: '20px', justifyContent: 'center'}}>
    //     <FlexboxGrid.Item colspan={12}>
    //       <Button appearance="primary" onClick={handleEdit} style={{ margin: '20px' }}>Edit</Button>
    //       <Button appearance="ghost" onClick={handleDelete}>Delete</Button>
    //     </FlexboxGrid.Item>
    //   </FlexboxGrid>
    // </Modal>
    <>
      {!realEdit &&
        (<Modal open={open} onClose={onClose} backdrop="static" {...rest}>
          <Modal.Header>
            <Modal.Title>
              Appointment Details
              <Button onClick={toggleEdit} style={{marginLeft: '5px', backgroundColor: 'red', color: 'white'}}>Editing Off</Button>
            </Modal.Title>
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
                  value={appointment.patientId}
                  readOnly
                  style={{backgroundColor: '#f2f2f2', color: '#555', border: '1px solid #ccc'}}
                />
              </Form.Group>
              <Form.Group controlId="Notes">
                <Form.ControlLabel>Notes</Form.ControlLabel>
                <Form.Control 
                  name="patientId" 
                  value={appointment.notes}
                  readOnly
                  style={{backgroundColor: '#f2f2f2', color: '#555', border: '1px solid #ccc'}}
                />
              </Form.Group>
              <Stack spacing={25}>
                <Form.Group controlId="start">
                  <Form.ControlLabel>Start Time</Form.ControlLabel>
                  <Form.Control 
                    name="start" 
                    value={formatDateWithAMPM(appointment.start)}
                    readOnly
                    style={{backgroundColor: '#f2f2f2', color: '#555', border: '1px solid #ccc'}}
                  />
                </Form.Group>
                <Form.Group controlId="end">
                  <Form.ControlLabel>End Time</Form.ControlLabel>
                  <Form.Control 
                    name="end" 
                    value={formatDateWithAMPM(appointment.end)}
                    readOnly
                    style={{backgroundColor: '#f2f2f2', color: '#555', border: '1px solid #ccc'}}
                  />
                </Form.Group>
              </Stack>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button onClick={toggleEdit} appearance="primary">
              Edit
            </Button> */}
            <Button onClick={onDelete} appearance='primary'>
              Delete Appointment
            </Button>
          </Modal.Footer>
        </Modal>)
      }
      {realEdit &&
        (<Modal open={open} onClose={onClose} backdrop="static" {...rest}>
          <Modal.Header>
            <Modal.Title>
              Appointment Details:
              <Button onClick={toggleEdit} style={{ marginLeft: '5px', backgroundColor: 'green', color: 'white' }}>Editing On</Button>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form fluid>
              <Form.Group controlId="patientId">
                <Form.ControlLabel>Patient ID</Form.ControlLabel>
                <Form.Control 
                  name="patientId" 
                  value={appointment.patientId}
                  readOnly
                  style={{backgroundColor: '#f2f2f2', color: '#555', border: '1px solid #ccc'}}
                />
              </Form.Group>
              <Form.Group controlId="Notes">
                <Form.ControlLabel>Notes</Form.ControlLabel>
                <Form.Control 
                  name="patientId" 
                  value={newAppointment.notes}
                  onChange={(value) => setNewAppointment({
                    ...newAppointment, notes: value,
                  })}
                />
              </Form.Group>
                <Form.Group controlId="start">
                <Form.ControlLabel>Event Date</Form.ControlLabel>
                <Stack spacing={6}>
                  <DatePicker
                    format="yyyy-MM-dd hh:mm:ss aa"
                    block
                    style={{ width: 200 }}
                    placeholder="Start Date"
                    showMeridian={true}
                    value={newAppointment.start}
                    onChange={(value) => setNewAppointment({ ...newAppointment, start: value })}
                  />
                  <DatePicker
                    format="yyyy-MM-dd hh:mm:ss aa"
                    block
                    style={{ width: 200 }}
                    placeholder="End Date"
                    showMeridian={true}
                    value={newAppointment.end}
                    onChange={(value) => setNewAppointment({ ...newAppointment, end: value })}
                  />
                </Stack>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => {onEdit(newAppointment);}} appearance="primary">
              Edit Appointment
            </Button>
            {/* <Button onClick={onDelete} style={{ color: 'white', backgroundColor: 'red', border: '1px solid red' }}>
              Delete
            </Button> */}
          </Modal.Footer>
        </Modal>)
      }
    </>
  );
};

export default EventEdit;
