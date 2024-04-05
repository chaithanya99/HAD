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

const treeData = mockTreeData({ limits: [2, 3, 3], labels: ['Provincial', 'County', 'Town'] });
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

const BasicForm = () => {
  const formRef = React.useRef(null);
  const model = SchemaModel({
    Input: StringType().isRequired("Value is required"),
    email: StringType().isEmail("Email needs to be valid"),
    MaskedInput: StringType().isRequired("Value is required")
  })
  const [doctorDetails, setDoctorDetails] = useState({
    specialization: "",
    name: "",
    abhaId: "",
    email_Id: "",
    mobile: "",
    address: "",
    gender: "",
    yearofBirth: ""
  });
  const handleInputChange = (e) => {
    setDoctorDetails(e);
  };
  const handleSubmit = async () => {

    try {
      console.log("function triggered");
      //Send a POST request to your server endpoint
      const response1 = await axios.post("http://localhost:8080/auth/generateToken",
      {
        "username" : "admin",
        "password": "admin"
      });
      const response = await axios.post("http://localhost:8080/admin/createdoc", doctorDetails,
      {
        headers: {
          'Authorization': `Bearer ${response1.data}`
        }
      });

      // Handle success response
      if (response.status >= 200 && response.status < 300) {
        console.log("values are being set now");
        setDoctorDetails({
          ...doctorDetails,
          specialization: "",
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
This form is used to create a doctor.
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

        <Form.Group controlId="specialization">
          <Form.ControlLabel>Specialization</Form.ControlLabel>
          <Form.Control name="specialization" accepter={SelectPicker} data={specData} />
        </Form.Group>

        <Form.Group controlId="abhaId">
          <Form.ControlLabel>ABHA Id</Form.ControlLabel>
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
            placeholder="XX - XXXXX - XXX"
            placeholderChar = {'\u2000'}
            mask={[
              /\d/,
              /\d/,
              ' ',
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              ' ',
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

        {/* <Form.Group controlId="TagInput">
          <Form.ControlLabel>TagInput</Form.ControlLabel>
          <Form.Control name="TagInput" accepter={TagInput} />
        </Form.Group>

        <Form.Group controlId="InputNumber">
          <Form.ControlLabel>InputNumber</Form.ControlLabel>
          <Form.Control name="InputNumber" accepter={InputNumber} />
        </Form.Group>


        <Form.Group controlId="Textarea">
          <Form.ControlLabel>Textarea</Form.ControlLabel>
          <Form.Control name="Textarea" accepter={Textarea} rows={3} />
        </Form.Group>

        <Form.Group controlId="checkbox">
          <Form.ControlLabel>Checkbox</Form.ControlLabel>
          <Form.Control name="checkbox" accepter={CheckboxGroup} inline style={{ marginLeft: -20 }}>
            <Checkbox value="HTML">HTML</Checkbox>
            <Checkbox value="CSS">CSS</Checkbox>
            <Checkbox value="Javascript">Javascript</Checkbox>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="radio">
          <Form.ControlLabel>Radio</Form.ControlLabel>
          <Form.Control name="radio" accepter={RadioGroup} inline style={{ marginLeft: -20 }}>
            <Radio value="HTML">HTML</Radio>
            <Radio value="CSS">CSS</Radio>
            <Radio value="Javascript">Javascript</Radio>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="datePicker">
          <Form.ControlLabel>DatePicker</Form.ControlLabel>
          <Form.Control name="datePicker" accepter={DatePicker} />
        </Form.Group>

        <Form.Group controlId="dateRangePicker">
          <Form.ControlLabel>DateRangePicker</Form.ControlLabel>
          <Form.Control name="dateRangePicker" accepter={DateRangePicker} />
        </Form.Group>

        <Form.Group controlId="checkPicker">
          <Form.ControlLabel>CheckPicker</Form.ControlLabel>
          <Form.Control name="checkPicker" accepter={CheckPicker} data={specData} />
        </Form.Group>

        <Form.Group controlId="selectPicker">
          <Form.ControlLabel>SelectPicker</Form.ControlLabel>
          <Form.Control name="selectPicker" accepter={SelectPicker} data={specData} />
        </Form.Group>

        <Form.Group controlId="tagPicker">
          <Form.ControlLabel>TagPicker</Form.ControlLabel>
          <Form.Control name="tagPicker" accepter={TagPicker} data={specData} />
        </Form.Group>

        <Form.Group controlId="inputPicker">
          <Form.ControlLabel>InputPicker</Form.ControlLabel>
          <Form.Control name="inputPicker" accepter={InputPicker} data={specData} />
        </Form.Group>

        <Form.Group controlId="cascader">
          <Form.ControlLabel>Cascader</Form.ControlLabel>
          <Form.Control name="cascader" accepter={Cascader} data={treeData} />
        </Form.Group>

        <Form.Group controlId="multiCascader">
          <Form.ControlLabel>MultiCascader</Form.ControlLabel>
          <Form.Control name="multiCascader" accepter={MultiCascader} data={treeData} />
        </Form.Group>

        <Form.Group controlId="TreePicker">
          <Form.ControlLabel>TreePicker</Form.ControlLabel>
          <Form.Control name="TreePicker" accepter={TreePicker} data={treeData} />
        </Form.Group>

        <Form.Group controlId="CheckTreePicker">
          <Form.ControlLabel>CheckTreePicker</Form.ControlLabel>
          <Form.Control name="CheckTreePicker" accepter={CheckTreePicker} data={treeData} />
        </Form.Group>

        <Form.Group controlId="rate">
          <Form.ControlLabel>Rate</Form.ControlLabel>
          <Form.Control name="rate" accepter={Rate} />
        </Form.Group>

        <Form.Group controlId="uploader">
          <Form.ControlLabel>Uploader</Form.ControlLabel>
          <Form.Control name="uploader" accepter={Uploader} action="#" />
        </Form.Group>

        <Form.Group controlId="Toggle">
          <Form.ControlLabel>Toggle</Form.ControlLabel>
          <Toggle style={{ lineHeight: '36px' }} />
        </Form.Group> */}

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

export default BasicForm;
