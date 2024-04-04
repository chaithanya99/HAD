import React, { useState } from 'react';
import { Form, Stack, SelectPicker,Input,InputGroup,MaskedInput,Button,Panel} from 'rsuite';
import RadioTile from '@/components/RadioTile';
import { Icon } from '@rsuite/icons';
import { FaGit, FaGithub, FaGitlab } from 'react-icons/fa';

import FormHeader from './FormHeader';

const TeamSettingsForm = () => {
  const [type, setType] = useState('1');

  return (
    <Form fluid>
      <FormHeader
        title="Linking Mobile Number"
        description="Please enter the mobile numeber that you want to link to your ABHA ID."
      />
      <Form.Group controlId="MaskedInput">
        <Form.ControlLabel>Enter Your Mobile Number</Form.ControlLabel>
          <InputGroup style={{width: 300, marginBottom: 10}}>
            <InputGroup.Addon>+91</InputGroup.Addon>
            <Form.Control
              name="MaskedInput"
              accepter={MaskedInput}
              placeholder = 'XX XXX XXXXX'
              placeholderChar = {'\u2000'}
              mask={[
                /\d/,
                /\d/,
                ' ',
                /\d/,
                /\d/,
                /\d/,
                ' ',
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
              ]}
            />
        </InputGroup>
      </Form.Group>

    </Form>
  );
};

export default TeamSettingsForm;
