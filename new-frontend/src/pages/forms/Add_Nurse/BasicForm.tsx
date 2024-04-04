import React, { useState } from "react";
import axios from 'axios'; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {SchemaModel, StringType} from "schema-typed";
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
  const formRef = React.useRef(null);
  const model = SchemaModel({
    Input: StringType().isRequired("Value is required"),
    email: StringType().isEmail("Email needs to be valid"),
    MaskedInput: StringType().isRequired("Value is required")
  })

  const [doctorDetails, setDoctorDetails] = React.useState({
    name: "",
    abhaId: "",
    email_Id: "",
    mobile: "",
    address: "",
    gender: "",
    yearofBirth: ""
  });

  //const token = localStorage.getItem('token');

  const handleInputChange = (e) => {
    // console.log("input has changed");
    // console.log(e.target);
    // const { name, value } = e.target;
    setDoctorDetails(e);
    // setDoctorDetails({ ...doctorDetails, [name]: value });
  };

  const handleSubmit = async () => {
    // e.preventDefault();

    try {
      console.log("function triggered");
      console.log(doctorDetails);
      
      const response1 = await axios.post("http://localhost:8080/auth/generateToken",
      {
        "username" : "admin",
        "password": "admin"
      });

      //Send a POST request to your server endpoint
      const response = await axios.post("http://localhost:8080/admin/createWorker", doctorDetails,
      {
        headers: {
          'Authorization': `Bearer ${response1.data}`
        }
      });
      console.log(response.status);
      // Handle success response
      if (response.status >= 200 && response.status < 300) {
        console.log("values are being set now");
        setDoctorDetails({
          ...doctorDetails,
          name: "",
          abhaId: "",
          email_Id: "",
          mobile: "",
          address: "",
          gender: "",
          yearofBirth: ""
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
      <Form 
      ref={formRef} 
      model={model} 
      onChange={handleInputChange}
      onSubmit={handleSubmit}
      formValue={doctorDetails}
      className="basic-form" 
      layout="horizontal">
        <Form.Group controlId="name">
          <Form.ControlLabel>Name</Form.ControlLabel>
          <Form.Control name="name"/>
        </Form.Group>

        <Form.Group controlId="abhaId">
          <Form.ControlLabel>ABHA ID</Form.ControlLabel>
          <Form.Control name="abhaId" placeholder="your id@sbx"/>
        </Form.Group>

        <Form.Group controlId="email_Id">
          <Form.ControlLabel>Email</Form.ControlLabel>
          <Form.Control name="email_Id" placeholder="mail@gmail.com"/>
        </Form.Group>

        <Form.Group controlId="mobile">
          <Form.ControlLabel>Phone Number</Form.ControlLabel>
          <Form.Control
            name="mobile"
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

        <Form.Group controlId="gender">
          <Form.ControlLabel>Gender</Form.ControlLabel>
          <Form.Control name="gender" accepter={InputPicker} data={genData} />
        </Form.Group>

        <Form.Group controlId="yearofBirth">
          <Form.ControlLabel>Year of Birth</Form.ControlLabel>
          <Form.Control name="yearofBirth"/>
        </Form.Group>

        <Form.Group controlId="address">
          <Form.ControlLabel>Address</Form.ControlLabel>
          <Form.Control name="address" accepter={Textarea} rows={3} />
        </Form.Group>

        <Form.Group>
          <ButtonToolbar>
            <Button appearance="primary" type="submit"> 
            Submit</Button>
            <Button appearance="default">Cancel</Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>
    </PageContent>
  );
};

export default BasicForm2;
