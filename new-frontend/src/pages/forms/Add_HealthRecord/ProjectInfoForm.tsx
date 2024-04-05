import React, { useState, useEffect } from 'react';
import { Form, Button, DatePicker } from 'rsuite';
import axios from 'axios';
import FormHeader from './FormHeader';

const ProjectInfoForm = ({ token, setTxnId, step, setStep, formtype, formData, setFormData }) => {

  useEffect(() => {
    setFormData(getInitialFormData(formtype));
  }, [formtype]);

  // Function to get initial form data based on formtype
  function getInitialFormData(formtype) {
    switch (formtype) {
      case 'OP consult':
        return {
          type: formtype,
          expiry: "",
          PatientID: "",
          DoctorID: "",
          Condition: "",
          Physical_Examination: "",
          Allergies: "",
          Medical_History: "",
          Family_History: "",
          Procedure: "",
          Medication: ""
        };
      case 'Prescription':
        return {
          type: formtype,
          expiry: "",
          PatientID: "",
          DoctorID: "",
          Medication: ""
        };
      case 'Immunization Record':
        return {
          type: formtype,
          expiry: "",
          PatientID: "",
          DoctorID: "",
          Immunization_Details: "",
          Immunization_recommendation: ""
        };
      case 'Diagnostic Report':
        return{
          type: formtype,
          expiry: "",
          PatientID: "",
          DoctorID: "",
          Diagnosis_Report: "",
        }
        case 'General health report':
          return{
            type: formtype,
            expiry: "",
            PatientID: "",
            DoctorID: "",
            Health_report: "",
          }
        case 'Wellness Record':
          return{
            type: formtype,
            expiry: "",
            PatientID: "",
            DoctorID: "",
            HeartRate: "",
            Respiratory_rate: "",
            temperature: "",
            blood_pressure: "",
            weight: "",
            height: "",
            General_assessment: "",
            Lifestyle: ""
          }
        case 'Discharge Summary':
          return{
            type: formtype,
            expiry: "",
            PatientID: "",
            DoctorID: "",
            complaints: "",
            Physical_Examination: "",
            Allergies: "",
            Medical_History: "",
            Family_History: "",
            Labs_and_Imaging: "",
            Procedure: "",
            careplan: "",
            Medicattion: ""
          }
      
      // Add cases for other types...
      default:
        return {};
    }
  }

  const handleSubmit = async () => {
    try {
      console.log("Form data:", formData);
      setStep(step + 1);
      // Send formData to the endpoint using axios
      // const response = await axios.post('your_endpoint_here', formData);
      // console.log(response.data); // Handle response accordingly
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormHeader title={`Enter ${formtype} Details`} description={''} />
        {/* Render form fields based on type */}
        

        <Form.Group>
          <Form.ControlLabel>Patient ID</Form.ControlLabel>
          <Form.Control name="PatientID" placeholder="your id" onChange={value => handleChange(value, 'PatientID')}/>
        </Form.Group>

        <Form.Group>
          <Form.ControlLabel>Doctor Id</Form.ControlLabel>
          <Form.Control name="DoctorID" placeholder="Enter your Id" onChange={value => handleChange(value, 'DoctorID')}/>
        </Form.Group>

        <Form.Group>
          <Form.ControlLabel>Expiry date</Form.ControlLabel>
          <Form.Control name="Expiry date" accepter={DatePicker} onChange={value => handleChange(value, 'expiry')}/>
        </Form.Group>

        {formtype === 'OP consult' && (
          <Form.Group>
            <Form.ControlLabel>Condition</Form.ControlLabel>
            <Form.Control name="Condition" onChange={value => handleChange(value, 'Condition')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {(formtype === 'OP consult' || formtype === 'Discharge Summary') && (
          <Form.Group>
            <Form.ControlLabel>Physical Examination</Form.ControlLabel>
            <Form.Control name="Physical_Examination" onChange={value => handleChange(value, 'Physical_Examination')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {(formtype === 'OP consult' || formtype === 'Discharge Summary') && (
          <Form.Group>
            <Form.ControlLabel>Allergies</Form.ControlLabel>
            <Form.Control name="Allergies" onChange={value => handleChange(value, 'Allergies')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {(formtype === 'OP consult' || formtype === 'Discharge Summary') && (
          <Form.Group>
            <Form.ControlLabel>Medical History</Form.ControlLabel>
            <Form.Control name="Medical_History" onChange={value => handleChange(value, 'Medical_History')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {(formtype === 'OP consult' || formtype === 'Discharge Summary') && (
          <Form.Group>
            <Form.ControlLabel>Family History</Form.ControlLabel>
            <Form.Control name="Family_History" onChange={value => handleChange(value, 'Family_History')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {(formtype === 'OP consult' || formtype === 'Discharge Summary') && (
          <Form.Group>
            <Form.ControlLabel>Procedure</Form.ControlLabel>
            <Form.Control name="Procedure" onChange={value => handleChange(value, 'Procedure')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}


        {(formtype === 'OP consult' || formtype === 'Prescription' || formtype === 'Discharge Summary') && (
          <Form.Group>
            <Form.ControlLabel>Medication</Form.ControlLabel>
            <Form.Control name="Medication" value={formData.Medication} onChange={value => handleChange(value, 'Medication')} />
            {/* Add more form fields for 'Prescription' type */}
          </Form.Group>
        )}

        {formtype === 'Immunization Record'  && (
          <Form.Group>
            <Form.ControlLabel>Immunization Details</Form.ControlLabel>
            <Form.Control name="Immunization_Details" onChange={value => handleChange(value, 'Immunization_Details')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {formtype === 'Immunization Record'  && (
          <Form.Group>
            <Form.ControlLabel>Immunization recommendation</Form.ControlLabel>
            <Form.Control name="Immunization_recommendation" onChange={value => handleChange(value, 'Immunization_recommendation')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {formtype === 'Diagnostic Report'  && (
          <Form.Group>
            <Form.ControlLabel>Diagnosis Report</Form.ControlLabel>
            <Form.Control name="Diagnosis_Report" onChange={value => handleChange(value, 'Diagnosis_Report')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {formtype === 'General health report'  && (
          <Form.Group>
            <Form.ControlLabel>Health report</Form.ControlLabel>
            <Form.Control name="Health_report" onChange={value => handleChange(value, 'Health_report')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {formtype === 'Wellness Record'  && (
          <Form.Group>
            <Form.ControlLabel>Heart Rate</Form.ControlLabel>
            <Form.Control name="HeartRate" onChange={value => handleChange(value, 'HeartRate')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {formtype === 'Wellness Record'  && (
          <Form.Group>
            <Form.ControlLabel>Respiratory rate</Form.ControlLabel>
            <Form.Control name="Respiratory_rate" onChange={value => handleChange(value, 'Respiratory_rate')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {formtype === 'Wellness Record'  && (
          <Form.Group>
            <Form.ControlLabel>Temperature</Form.ControlLabel>
            <Form.Control name="temperature" onChange={value => handleChange(value, 'temperature')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {formtype === 'Wellness Record'  && (
          <Form.Group>
            <Form.ControlLabel>Blood Pressure</Form.ControlLabel>
            <Form.Control name="blood_pressure" onChange={value => handleChange(value, 'blood_pressure')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {formtype === 'Wellness Record'  && (
          <Form.Group>
            <Form.ControlLabel>Weight</Form.ControlLabel>
            <Form.Control name="weight" onChange={value => handleChange(value, 'weight')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {formtype === 'Wellness Record'  && (
          <Form.Group>
            <Form.ControlLabel>Height</Form.ControlLabel>
            <Form.Control name="height" onChange={value => handleChange(value, 'height')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {formtype === 'Wellness Record'  && (
          <Form.Group>
            <Form.ControlLabel>General assessment</Form.ControlLabel>
            <Form.Control name="General_assessment" onChange={value => handleChange(value, 'General_assessment')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {formtype === 'Wellness Record'  && (
          <Form.Group>
            <Form.ControlLabel>Lifestyle</Form.ControlLabel>
            <Form.Control name="Lifestyle" onChange={value => handleChange(value, 'Lifestyle')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {formtype === 'Discharge Summary'  && (
          <Form.Group>
            <Form.ControlLabel>Complaints</Form.ControlLabel>
            <Form.Control name="complaints" onChange={value => handleChange(value, 'complaints')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {formtype === 'Discharge Summary'  && (
          <Form.Group>
            <Form.ControlLabel>Labs and Imaging</Form.ControlLabel>
            <Form.Control name="Labs_and_Imaging" onChange={value => handleChange(value, 'Labs_and_Imaging')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {formtype === 'Discharge Summary'  && (
          <Form.Group>
            <Form.ControlLabel>Care plan</Form.ControlLabel>
            <Form.Control name="careplan" onChange={value => handleChange(value, 'careplan')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {/* Add more cases for other types... */}
        <Form.Group>
          <Button appearance="primary" type="submit">Submit</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default ProjectInfoForm;
