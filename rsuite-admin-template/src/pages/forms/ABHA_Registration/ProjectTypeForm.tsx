import React, { useState } from 'react';
import { Form, Stack,MaskedInput,Checkbox,Panel,Button} from 'rsuite';
import RadioTile from '@/components/RadioTile';
import { Icon } from '@rsuite/icons';
import { VscNotebookTemplate, VscRepoClone, VscFile } from 'react-icons/vsc';
import FormHeader from './FormHeader';

const TermsAndConditions = () => (
  <Panel bordered style={{ maxHeight: '190px',overflowY: 'auto',border: '1px solid #ccc' }}>
    <p>
    I, hereby declare that I am voluntarily sharing my Aadhaar number and demographic information issued by UIDAI, 
    with National Health Authority (NHA) for the sole purpose of creation of ABHA number. I understand that my ABHA 
    number can be used and shared for purposes as may be notified by ABDM from time to time including provision of 
    healthcare services. Further, I am aware that my personal identifiable information (Name, Address, Age, Date of Birth, 
    Gender and Photograph) may be made available to the entities working in the National Digital Health Ecosystem (NDHE) 
    which inter alia includes stakeholders and entities such as healthcare professionals (e.g. doctors), facilities (e.g. 
    hospitals, laboratories) and data fiduciaries (e.g. health programmes), which are registered with or linked to the 
    Ayushman Bharat Digital Mission (ABDM), and various processes there under. I authorize NHA to use my Aadhaar number 
    for performing Aadhaar based authentication with UIDAI as per the provisions of the Aadhaar (Targeted Delivery of 
    Financial and other Subsidies, Benefits and Services) Act, 2016 for the aforesaid purpose. I understand that UIDAI 
    will share my e-KYC details, or response of “Yes” with NHA upon successful authentication. I have been duly informed about the 
    option of using other IDs apart from Aadhaar; however, I consciously choose to use Aadhaar number for the purpose of availing 
    benefits across the NDHE. I am aware that my personal identifiable information excluding Aadhaar number / VID number can be 
    used and shared for purposes as mentioned above. I reserve the right to revoke the given consent at any point of time as 
    per provisions of Aadhaar Act and Regulations.

    </p>

  </Panel>
);

const ProjectTypeForm = () => {
  const [type, setType] = useState('personal');

  return (
    <Form>
      <FormHeader
        title="Enter your Aadhaar Number"
        description="Your Aadhaar number will be used for user authentication and generation of your ABHA Number and Address."
      />
        <Form.Group controlId="MaskedInput">
          <Form.ControlLabel>Enter Aadhaar Number</Form.ControlLabel>
          <Form.Control
            name="MaskedInput"
            accepter={MaskedInput}
            placeholder="XXXX - XXXX - XXXX"
            placeholderChar = {'\u2000'}
            mask={[
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              ' ',
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              ' ',
              /\d/,
              /\d/,
              /\d/,
              /\d/
            ]}
          />
        </Form.Group>

      <Form.Group controlId="termsAndConditions">
        <Form.ControlLabel>Terms and Conditions</Form.ControlLabel>
        <TermsAndConditions />
        <Checkbox>Accept Terms and Conditions</Checkbox>
      </Form.Group>
    </Form>
  );
};

export default ProjectTypeForm;
