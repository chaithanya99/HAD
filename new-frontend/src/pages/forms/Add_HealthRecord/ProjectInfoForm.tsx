import React, { useState, useEffect } from 'react';
import { Form, Button, DatePicker } from 'rsuite';
import axios from 'axios';
import FormHeader from './FormHeader';

const ProjectInfoForm = ({ token, setTxnId, step, setStep, formtype, formData, setFormData, pid, did }) => {

  useEffect(() => {
    setFormData(getInitialFormData(formtype));
  }, [formtype]);

  // Function to get initial form data based on formtype
  function getInitialFormData(formtype) {
    const parsedPid = parseInt(pid, 10);
    const parsedDid = parseInt(did, 10);
    switch (formtype) {
      case 'OP consult':
        return {
          type: formtype,
          expiry: "",
          patientId: parsedPid,
          doctorId: parsedDid,
          medicalcondition: "",
          physical_examination: "",
          allergies: "",
          medical_history: "",
          family_history: "",
          medicalprocedure: "",
          medication: ""
        };
      case 'Prescription':
        return {
          type: formtype,
          expiry: "",
          patientId: parsedPid,
          doctorId: parsedDid,
          medication: ""
        };
      case 'Immunization Record':
        return {
          type: formtype,
          expiry: "",
          patientId: parsedPid,
          doctorId: parsedDid,
          immunization_details: "",
          immunization_recommendation: ""
        };
      case 'Diagnostic Report':
        return{
          type: formtype,
          expiry: "",
          patientId: parsedPid,
          doctorId: parsedDid,
          diagnosis: "",
        }
        case 'General health report':
          return{
            type: formtype,
            expiry: "",
            patientId: parsedPid,
            doctorId: parsedDid,
            health_report: "",
          }
        case 'Wellness Record':
          return{
            type: formtype,
            expiry: "",
            patientId: parsedPid,
            doctorId: parsedDid,
            heart_rate: "",
            respiratory_rate: "",
            temperature: "",
            blood_pressure: "",
            weight: "",
            height: "",
            general_assessment: "",
            lifestyle: ""
          }
        case 'Discharge Summary':
          return{
            type: formtype,
            expiry: "",
            patientId: parsedPid,
            doctorId: parsedDid,
            complaints: "",
            physical_examination: "",
            allergies: "",
            medical_history: "",
            family_history: "",
            labs_and_imaging: "",
            medicalprocedure: "",
            careplan: "",
            medication: ""
          }
      
      // Add cases for other types...
      default:
        return {};
    }
  }

  const handleSubmit = async () => {
    try {
      console.log("Form data:", formData);
      console.log(typeof formData.patientId);
      setStep(step + 1);
      // Send formData to the endpoint using axios
      const response1 = await axios.post("http://localhost:8080/auth/generateToken",
      {
        "username" : "admin",
        "password": "admin"
      });

      const response = await axios.post('http://localhost:8080/HealthRecord/createhealthrecord', formData,
       { 
        headers: {
        'Authorization': `Bearer ${response1.data}`
        } 
      }
      );
      console.log(response.data); // Handle response accordingly
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
          <Form.ControlLabel>Expiry date</Form.ControlLabel>
          <Form.Control name="Expiry date" accepter={DatePicker} onChange={value => handleChange(value, 'expiry')}/>
        </Form.Group>

        {formtype === 'OP consult' && (
          <Form.Group>
            <Form.ControlLabel>medicalcondition</Form.ControlLabel>
            <Form.Control name="medicalcondition" onChange={value => handleChange(value, 'medicalcondition')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {(formtype === 'OP consult' || formtype === 'Discharge Summary') && (
          <Form.Group>
            <Form.ControlLabel>Physical Examination</Form.ControlLabel>
            <Form.Control name="physical_examination" onChange={value => handleChange(value, 'physical_examination')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {(formtype === 'OP consult' || formtype === 'Discharge Summary') && (
          <Form.Group>
            <Form.ControlLabel>Allergies</Form.ControlLabel>
            <Form.Control name="allergies" onChange={value => handleChange(value, 'allergies')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {(formtype === 'OP consult' || formtype === 'Discharge Summary') && (
          <Form.Group>
            <Form.ControlLabel>Medical History</Form.ControlLabel>
            <Form.Control name="medical_history" onChange={value => handleChange(value, 'medical_history')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {(formtype === 'OP consult' || formtype === 'Discharge Summary') && (
          <Form.Group>
            <Form.ControlLabel>Family History</Form.ControlLabel>
            <Form.Control name="family_history" onChange={value => handleChange(value, 'family_history')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {(formtype === 'OP consult' || formtype === 'Discharge Summary') && (
          <Form.Group>
            <Form.ControlLabel>medicalprocedure</Form.ControlLabel>
            <Form.Control name="medicalprocedure" onChange={value => handleChange(value, 'medicalprocedure')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}


        {(formtype === 'OP consult' || formtype === 'Prescription' || formtype === 'Discharge Summary') && (
          <Form.Group>
            <Form.ControlLabel>medication</Form.ControlLabel>
            <Form.Control name="medication" value={formData.medication} onChange={value => handleChange(value, 'medication')} />
            {/* Add more form fields for 'Prescription' type */}
          </Form.Group>
        )}

        {formtype === 'Immunization Record'  && (
          <Form.Group>
            <Form.ControlLabel>Immunization Details</Form.ControlLabel>
            <Form.Control name="immunization_details" onChange={value => handleChange(value, 'immunization_details')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {formtype === 'Immunization Record'  && (
          <Form.Group>
            <Form.ControlLabel>Immunization recommendation</Form.ControlLabel>
            <Form.Control name="immunization_recommendation" onChange={value => handleChange(value, 'immunization_recommendation')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {formtype === 'Diagnostic Report'  && (
          <Form.Group>
            <Form.ControlLabel>Diagnosis Report</Form.ControlLabel>
            <Form.Control name="diagnosis" onChange={value => handleChange(value, 'diagnosis')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {formtype === 'General health report'  && (
          <Form.Group>
            <Form.ControlLabel>Health report</Form.ControlLabel>
            <Form.Control name="health_report" onChange={value => handleChange(value, 'health_report')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {formtype === 'Wellness Record'  && (
          <Form.Group>
            <Form.ControlLabel>Heart Rate</Form.ControlLabel>
            <Form.Control name="heart_rate" onChange={value => handleChange(value, 'heart_rate')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {formtype === 'Wellness Record'  && (
          <Form.Group>
            <Form.ControlLabel>Respiratory rate</Form.ControlLabel>
            <Form.Control name="respiratory_rate" onChange={value => handleChange(value, 'respiratory_rate')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {formtype === 'Wellness Record'  && (
          <Form.Group>
            <Form.ControlLabel>temperature</Form.ControlLabel>
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
            <Form.Control name="general_assessment" onChange={value => handleChange(value, 'general_assessment')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {formtype === 'Wellness Record'  && (
          <Form.Group>
            <Form.ControlLabel>lifestyle</Form.ControlLabel>
            <Form.Control name="lifestyle" onChange={value => handleChange(value, 'lifestyle')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {formtype === 'Discharge Summary'  && (
          <Form.Group>
            <Form.ControlLabel>complaints</Form.ControlLabel>
            <Form.Control name="complaints" onChange={value => handleChange(value, 'complaints')} />
            {/* Add more form fields for 'OP consult' type */}
          </Form.Group>
        )}

        {formtype === 'Discharge Summary'  && (
          <Form.Group>
            <Form.ControlLabel>Labs and Imaging</Form.ControlLabel>
            <Form.Control name="labs_and_imaging" onChange={value => handleChange(value, 'labs_and_imaging')} />
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
