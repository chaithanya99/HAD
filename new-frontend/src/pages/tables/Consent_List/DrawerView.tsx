import React from 'react';
import {
  Drawer,
  DrawerProps,
  Button,
  Form,
  Stack,
  InputNumber,
  InputGroup,
  Slider,
  Rate,
  DatePicker,
  InputPicker,
  SelectPicker,
  CheckPicker
} from 'rsuite';

const specData = ['Diagnostic Report', 'Discharge Summary', 'Health Document Record', 'Immunizatioon Record', 'Wellness Record', 'OP Consultation','Prescription'].map(item => ({
  label: item,
  value: item
}));

const genData = ['Lifetime', 'Month', 'Year'].map(item => ({
  label: item,
  value: item
}));

const DrawerView = (props: DrawerProps) => {
  const { onClose, ...rest } = props;
  return (
    <Drawer backdrop="static" size="sm" placement="right" onClose={onClose} {...rest}>
      <Drawer.Header>
        <Drawer.Title>Create Consent Request</Drawer.Title>
        <Drawer.Actions>
          <Button onClick={onClose} appearance="primary">
            Confirm
          </Button>
          <Button onClick={onClose} appearance="subtle">
            Cancel
          </Button>
        </Drawer.Actions>
      </Drawer.Header>

      <Drawer.Body>
        <Form fluid>
          <Form.Group>
            <Form.ControlLabel>ABHA Address</Form.ControlLabel>
            <Form.Control name="abha_id" type="abha_id" />
          </Form.Group>
          <Stack justifyContent="space-between" style={{ marginBottom: 20 }}>
            <Form.Group>
              <Form.ControlLabel>From Date</Form.ControlLabel>
              <Form.Control name="firstname" style={{ width: 200 }} accepter={DatePicker}/>
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>To Date</Form.ControlLabel>
              <Form.Control name="lastname" style={{ width: 200 }} accepter={DatePicker}/>
            </Form.Group>
          </Stack>
          <Form.Group>
            <Form.ControlLabel>Expiry</Form.ControlLabel>
            <Form.Control name="expiry" style={{ width: 200}} accepter={DatePicker}/>
          </Form.Group>
          <Form.Group controlId="checkpicker">
            <Form.ControlLabel>Purpose of request</Form.ControlLabel>
            <Form.Control name="checkpicker" accepter={CheckPicker} data={specData} style={{width:'100%'}}/>
          </Form.Group>
          <Form.Group controlId="inputPicker">
            <Form.ControlLabel>Date Range</Form.ControlLabel>
            <Form.Control name="inputPicker" accepter={InputPicker} data={genData} style={{width:'100%'}}/>
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Notes</Form.ControlLabel>
            <Form.Control name="street" />
          </Form.Group>

          {/* <Form.Group>
            <Form.ControlLabel>Rating</Form.ControlLabel>
            <Form.Control name="rating" accepter={Rate} />
          </Form.Group> */}

          {/* <Form.Group>
            <Form.ControlLabel>Skill Proficiency</Form.ControlLabel>
            <Form.Control name="skill" accepter={Slider} progress />
          </Form.Group> */}

          {/* <Form.Group>
            <Form.ControlLabel>Income</Form.ControlLabel>
            <InputGroup style={{ width: '100%' }}>
              <InputGroup.Addon>$</InputGroup.Addon>
              <Form.Control name="income" accepter={InputNumber} style={{ width: '100%' }} />
            </InputGroup>
          </Form.Group> */}
        </Form>
      </Drawer.Body>
    </Drawer>
  );
};

export default DrawerView;
