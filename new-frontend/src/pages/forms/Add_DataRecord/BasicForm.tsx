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
const rateofseverity = ['Mild', 'High', 'low', 'insignificant'].map(item => ({
  label: item,
  value: item
}));

const Report = ['Diagnostic Report', 'OP consult', 'General health report', 'Wellness Record', 'Prescription', 'Immunization Record', 'Discharge Summary'].map(item => ({
  label: item,
  value: item
}));

const Textarea = React.forwardRef<HTMLInputElement, any>((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

const BasicForm3 = () => {
  const [HealthRecord, setHealthRecord] = useState({
    type: "",
    expiry: "",
    PatientId: "",
    DoctorId: ""
  });
  const [Opconsult, setOpconsult] = useState({
    type: "",
    expiry: "",
    PatientId: "",
    DoctorId: "",
    condition: "",
    Physical_Examination: "",
    Allergies: "",
    Medical_History: "",
    Family_History: "",
    Advice: "",
    Procedure: "",
    Medicattion: ""
  });
  const [Prescription, setPrescription] = useState({
    type: "",
    expiry: "",
    PatientId: "",
    DoctorId: "",
    Medication: ""
  });

  const [ImmunizationRecord, setImmunizationRecord] = useState({
    type: "",
    expiry: "",
    PatientId: "",
    DoctorId: "",
    Details: "",
    Immunization_recommendation: ""
  });

  const [Diagnosticreport, setDiagnosticreport] = useState({
    type: "",
    expiry: "",
    PatientId: "",
    DoctorId: "",
    Diagnosis_Report: "",

  });

  const [Dischargesummary, setDischargesummary] = useState({
    type: "",
    expiry: "",
    PatientId: "",
    DoctorId: "",
    complaints: "",
    Physical_Examination: "",
    Allergies: "",
    Medical_History: "",
    Family_History: "",
    Labs_and_Imaging: "",
    Procedure: "",
    careplan: "",
    Medicattion: ""
  });

  const [WellnessRecord, setWellnessRecord] = useState({
    type: "",
    expiry: "",
    PatientId: "",
    DoctorId: "",
    HeartRate: "",
    Respiratory_rate: "",
    temperature: "",
    blood_pressure: "",
    weight: "",
    height: "",
    General_assessment: "",
    Lifestyle: ""
  });

  const [Healthreport, setHealthreport] = useState({
    type: "",
    expiry: "",
    PatientId: "",
    DoctorId: "",
    Health_report: "",

  });



  const token = localStorage.getItem('token');
  const handleInputChange = (e) => {
    console.log("input has changed");
    const { name, value } = e.target;
    setHealthRecord({ ...HealthRecord, [name]: value });
  };
  const handleSubmit = async () => {
    // e.preventDefault();

    try {
      console.log("function triggered");
      //Send a POST request to your server endpoint
      let endpoint = "";
      switch (HealthRecord.type) {
        case 'Diagnostic Report':
          endpoint = "http://localhost:8080/admin/createDiagnosticReport";
          break;
        case 'OP consult':
          endpoint = "http://localhost:8080/admin/createOPConsult";
          break;
        case 'General health report':
          endpoint = "http://localhost:8080/admin/createGeneralHealthReport";
          break;
        case 'Wellness Record':
          endpoint = "http://localhost:8080/admin/createWellnessRecord";
          break;
        case 'Prescription':
          endpoint = "http://localhost:8080/admin/createPrescription";
          break;
        case 'Immunization Record':
          endpoint = "http://localhost:8080/admin/createImmunizationRecord";
          break;
        case 'Discharge Summary':
          endpoint = "http://localhost:8080/admin/createDischargeSummary";
          break;
        default:
          // Handle default case or show error message
          break;
      }
      const response = await axios.post(endpoint, HealthRecord,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Handle success response
      if (response.status === 200) {
        console.log("values are being set now");
        setHealthRecord({
          type: "",
          expiry: "",
          PatientId: "",
          DoctorId: ""
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
This form is used to create a Health Record.
      </Message>
      <Divider />
      <Form className="basic-form" layout="horizontal">
        <Form.Group controlId="inputPicker">
          <Form.ControlLabel>type</Form.ControlLabel>
          <Form.Control name="inputPicker" accepter={InputPicker} data={Report} />
        </Form.Group>

        <Form.Group controlId="datePicker">
          <Form.ControlLabel>Expiry date</Form.ControlLabel>
          <Form.Control name="datePicker" accepter={DatePicker} />
        </Form.Group>

        <Form.Group controlId="Input">
          <Form.ControlLabel>Patient ID</Form.ControlLabel>
          <Form.Control name="Input" placeholder="your id"/>
        </Form.Group>

        <Form.Group controlId="Input">
          <Form.ControlLabel>DoctorId</Form.ControlLabel>
          <Form.Control name="Input" placeholder="Enter your Id"/>
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

export default BasicForm3;