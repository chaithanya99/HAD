import React from 'react';
import { Form, SelectPicker } from 'rsuite';
import Textarea from '@/components/Textarea';
import FormHeader from './FormHeader';

const Step4 = () => {
  return (
    <Form fluid>
      <FormHeader
        title="Work In Progress"
        description="Working on this!"
      />

      <Form.Group controlId="name">
        <Form.ControlLabel>Random Field</Form.ControlLabel>
        <Form.Control name="name" />
      </Form.Group>
    </Form>
  );
};

export default Step4;
