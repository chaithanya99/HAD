import React, { useState } from "react";
import axios from 'axios'; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Form,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  DateRangePicker,
  CheckPicker,
  SelectPicker,
  TagPicker,
  Input,
  TagInput,
  MaskedInput,
  InputPicker,
  InputNumber,
  Cascader,
  MultiCascader,
  Rate,
  Uploader,
  Message,
  Divider,
  TreePicker,
  CheckTreePicker,
  ButtonToolbar,
  Button,
  Toggle,
  AutoComplete
} from 'rsuite';
import PageContent from '@/components/PageContent';

import { mockTreeData } from '@/data/mock';

// const treeData = mockTreeData({ limits: [2, 3, 3], labels: ['Provincial', 'County', 'Town'] });
const specData = ['Radiology', 'Neurology', 'Cardiologist', 'Oncologist', 'ENT', 'Other'].map(item => ({
  label: item,
  value: item
}));
const genData = ['Male', 'Female', 'Other'].map(item => ({
  label: item,
  value: item
}));

const Textarea = React.forwardRef<HTMLInputElement, any>((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

const BasicForm2 = () => {
  const [doctorDetails, setDoctorDetails] = useState({
    specialization: "",
    name: "",
    abha_id: "",
    email_Id: "",
    mobile: "",
    address: "",
    gender: "",
    YearofBirth: ""
  });
  const token = localStorage.getItem('token');
  const handleInputChange = (e) => {
    console.log("input has changed");
    const { name, value } = e.target;
    setDoctorDetails({ ...doctorDetails, [name]: value });
  };
  const handleSubmit = async () => {
    // e.preventDefault();

    try {
      console.log("function triggered");
      //Send a POST request to your server endpoint
      const response = await axios.post("http://localhost:8080/admin/createdoc", doctorDetails,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Handle success response
      if (response.status === 200) {
        console.log("values are being set now");
        setDoctorDetails({
          specialization: "",
          name: "",
          abha_id: "",
          email_Id: "",
          mobile: "",
          address: "",
          gender: "",
          YearofBirth: ""
        });
  
    }} catch (error) {
      // Handle error
      toast("Error: Unable to add doctor. Please try again later.");
    } finally {
    }
  };
  return (
    <PageContent>
      <Message>
This form is used to create a Nurse.
      </Message>
      <Divider />
      <Form className="basic-form" layout="horizontal">
        <Form.Group controlId="Input">
          <Form.ControlLabel>Name</Form.ControlLabel>
          <Form.Control name="Input"/>
        </Form.Group>

        <Form.Group controlId="Input">
          <Form.ControlLabel>ABHA ID</Form.ControlLabel>
          <Form.Control name="Input" placeholder="your id@sbx"/>
        </Form.Group>

        <Form.Group controlId="Input">
          <Form.ControlLabel>Email</Form.ControlLabel>
          <Form.Control name="Input" placeholder="mail@gmail.com"/>
        </Form.Group>

        <Form.Group controlId="MaskedInput">
          <Form.ControlLabel>Phone Number</Form.ControlLabel>
          <Form.Control
            name="MaskedInput"
            accepter={MaskedInput}
            placeholder="(+91) 97404-61745"
            mask={[
              '(',
              /[1-9]/,
              /\d/,
              /\d/,
              ')',
              ' ',
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

        <Form.Group controlId="inputPicker">
          <Form.ControlLabel>Gender</Form.ControlLabel>
          <Form.Control name="inputPicker" accepter={InputPicker} data={genData} />
        </Form.Group>

        <Form.Group controlId="datePicker">
          <Form.ControlLabel>Date of Birth</Form.ControlLabel>
          <Form.Control name="datePicker" accepter={DatePicker} />
        </Form.Group>

        <Form.Group controlId="Textarea">
          <Form.ControlLabel>Address</Form.ControlLabel>
          <Form.Control name="Textarea" accepter={Textarea} rows={3} />
        </Form.Group>

        <Form.Group>
          <ButtonToolbar>
            <Button appearance="primary"
              onClick={handleSubmit}> 
            Submit</Button>
            <Button appearance="default">Cancel</Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>
    </PageContent>
  );
};

export default BasicForm2;
