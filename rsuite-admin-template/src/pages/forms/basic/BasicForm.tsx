// import React, { useState } from "react";
// import axios from 'axios'; 
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   Form,
//   RadioGroup,
//   Radio,
//   Checkbox,
//   CheckboxGroup,
//   DatePicker,
//   DateRangePicker,
//   CheckPicker,
//   SelectPicker,
//   TagPicker,
//   Input,
//   TagInput,
//   MaskedInput,
//   InputPicker,
//   InputNumber,
//   Cascader,
//   MultiCascader,
//   Rate,
//   Uploader,
//   Message,
//   Divider,
//   TreePicker,
//   CheckTreePicker,
//   ButtonToolbar,
//   Button,
//   Toggle,
//   AutoComplete
// } from 'rsuite';
// import PageContent from '@/components/PageContent';

// import { mockTreeData } from '@/data/mock';

// const treeData = mockTreeData({ limits: [2, 3, 3], labels: ['Provincial', 'County', 'Town'] });
// const selectData = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice'].map(item => ({
//   label: item,
//   value: item
// }));

// const Textarea = React.forwardRef<HTMLInputElement, any>((props, ref) => (
//   <Input {...props} as="textarea" ref={ref} />
// ));

// const BasicForm = () => {
//   const [doctorDetails, setDoctorDetails] = useState({
//     specialization: "",
//     name: "",
//     abha_id: "",
//     email_Id: "",
//     mobile: "",
//     address: "",
//     gender: "",
//     YearofBirth: ""
//   });
//   const token = localStorage.getItem('token');
//   // const handleInputChange = (e) => {
//   //   console.log("input has changed");
//   //   const { name, value } = e.target;
//   //   setDoctorDetails({ ...doctorDetails, [name]: value });
//   // };
//   const handleSubmit = async () => {
//     // e.preventDefault();

//     try {
//       console.log("function triggered");
//       // Send a POST request to your server endpoint
//       // const response = await axios.post("http://localhost:8080/admin/createdoc", doctorDetails,
//       // {
//       //   headers: {
//       //     'Authorization': `Bearer ${token}`
//       //   }
//       // });

//       // // Handle success response
//       // if (response.status === 200) {
//       //   console.log("values are being set now");
//       //   setDoctorDetails({
//       //     specialization: "",
//       //     name: "",
//       //     abha_id: "",
//       //     email_Id: "",
//       //     mobile: "",
//       //     address: "",
//       //     gender: "",
//       //     YearofBirth: ""
//       //   });
  
//     } catch (error) {
//       // Handle error
//       toast("Error: Unable to add doctor. Please try again later.");
//     } finally {
//     }
//   };
//   return (
//     <PageContent>
//       <Message>
// This form is used to create a doctor.
//       </Message>
//       <Divider />
//       <Form className="basic-form" layout="horizontal">
//         <Form.Group controlId="Input">
//           <Form.ControlLabel>Specialization</Form.ControlLabel>
//           <Form.Control name="Input" />
//         </Form.Group>

//         <Form.Group controlId="MaskedInput">
//           <Form.ControlLabel>Phone Number</Form.ControlLabel>
//           <Form.Control
//             name="MaskedInput"
//             accepter={MaskedInput}
//             placeholder="(555) 495-3947"
//             mask={[
//               '(',
//               /[1-9]/,
//               /\d/,
//               /\d/,
//               ')',
//               ' ',
//               /\d/,
//               /\d/,
//               /\d/,
//               '-',
//               /\d/,
//               /\d/,
//               /\d/,
//               /\d/
//             ]}
//           />
//         </Form.Group>

//         <Form.Group controlId="TagInput">
//           <Form.ControlLabel>TagInput</Form.ControlLabel>
//           <Form.Control name="TagInput" accepter={TagInput} />
//         </Form.Group>

//         <Form.Group controlId="InputNumber">
//           <Form.ControlLabel>InputNumber</Form.ControlLabel>
//           <Form.Control name="InputNumber" accepter={InputNumber} />
//         </Form.Group>

//         <Form.Group controlId="AutoComplete">
//           <Form.ControlLabel>AutoComplete</Form.ControlLabel>
//           <Form.Control name="AutoComplete" accepter={AutoComplete} data={selectData} />
//         </Form.Group>

//         <Form.Group controlId="Textarea">
//           <Form.ControlLabel>Textarea</Form.ControlLabel>
//           <Form.Control name="Textarea" accepter={Textarea} rows={3} />
//         </Form.Group>

//         <Form.Group controlId="checkbox">
//           <Form.ControlLabel>Checkbox</Form.ControlLabel>
//           <Form.Control name="checkbox" accepter={CheckboxGroup} inline style={{ marginLeft: -20 }}>
//             <Checkbox value="HTML">HTML</Checkbox>
//             <Checkbox value="CSS">CSS</Checkbox>
//             <Checkbox value="Javascript">Javascript</Checkbox>
//           </Form.Control>
//         </Form.Group>

//         <Form.Group controlId="radio">
//           <Form.ControlLabel>Radio</Form.ControlLabel>
//           <Form.Control name="radio" accepter={RadioGroup} inline style={{ marginLeft: -20 }}>
//             <Radio value="HTML">HTML</Radio>
//             <Radio value="CSS">CSS</Radio>
//             <Radio value="Javascript">Javascript</Radio>
//           </Form.Control>
//         </Form.Group>

//         <Form.Group controlId="datePicker">
//           <Form.ControlLabel>DatePicker</Form.ControlLabel>
//           <Form.Control name="datePicker" accepter={DatePicker} />
//         </Form.Group>

//         <Form.Group controlId="dateRangePicker">
//           <Form.ControlLabel>DateRangePicker</Form.ControlLabel>
//           <Form.Control name="dateRangePicker" accepter={DateRangePicker} />
//         </Form.Group>

//         <Form.Group controlId="checkPicker">
//           <Form.ControlLabel>CheckPicker</Form.ControlLabel>
//           <Form.Control name="checkPicker" accepter={CheckPicker} data={selectData} />
//         </Form.Group>

//         <Form.Group controlId="selectPicker">
//           <Form.ControlLabel>SelectPicker</Form.ControlLabel>
//           <Form.Control name="selectPicker" accepter={SelectPicker} data={selectData} />
//         </Form.Group>

//         <Form.Group controlId="tagPicker">
//           <Form.ControlLabel>TagPicker</Form.ControlLabel>
//           <Form.Control name="tagPicker" accepter={TagPicker} data={selectData} />
//         </Form.Group>

//         <Form.Group controlId="inputPicker">
//           <Form.ControlLabel>InputPicker</Form.ControlLabel>
//           <Form.Control name="inputPicker" accepter={InputPicker} data={selectData} />
//         </Form.Group>

//         <Form.Group controlId="cascader">
//           <Form.ControlLabel>Cascader</Form.ControlLabel>
//           <Form.Control name="cascader" accepter={Cascader} data={treeData} />
//         </Form.Group>

//         <Form.Group controlId="multiCascader">
//           <Form.ControlLabel>MultiCascader</Form.ControlLabel>
//           <Form.Control name="multiCascader" accepter={MultiCascader} data={treeData} />
//         </Form.Group>

//         <Form.Group controlId="TreePicker">
//           <Form.ControlLabel>TreePicker</Form.ControlLabel>
//           <Form.Control name="TreePicker" accepter={TreePicker} data={treeData} />
//         </Form.Group>

//         <Form.Group controlId="CheckTreePicker">
//           <Form.ControlLabel>CheckTreePicker</Form.ControlLabel>
//           <Form.Control name="CheckTreePicker" accepter={CheckTreePicker} data={treeData} />
//         </Form.Group>

//         <Form.Group controlId="rate">
//           <Form.ControlLabel>Rate</Form.ControlLabel>
//           <Form.Control name="rate" accepter={Rate} />
//         </Form.Group>

//         <Form.Group controlId="uploader">
//           <Form.ControlLabel>Uploader</Form.ControlLabel>
//           <Form.Control name="uploader" accepter={Uploader} action="#" />
//         </Form.Group>

//         <Form.Group controlId="Toggle">
//           <Form.ControlLabel>Toggle</Form.ControlLabel>
//           <Toggle style={{ lineHeight: '36px' }} />
//         </Form.Group>

//         <Form.Group>
//           <ButtonToolbar>
//             <Button appearance="primary"
//               onClick={handleSubmit}> 
//             Submit</Button>
//             <Button appearance="default">Cancel</Button>
//           </ButtonToolbar>
//         </Form.Group>
//       </Form>
//     </PageContent>
//   );
// };

// export default BasicForm;
import React, { useState } from "react";
import { Form, FormGroup, ControlLabel, FormControl, Button, Alert } from 'rsuite';
import axios from 'axios';

const DoctorAdd = () => {
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
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8080/admin/createdoc", doctorDetails, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
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
        Alert.success('Doctor Added Successfully');
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (error) {
      setError("Error: Unable to add doctor. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="main-content">
          <div className="card">
            <h1 className="card-title">Add Doctor</h1>
            <Form fluid>
              <FormGroup>
                <ControlLabel>Specialization</ControlLabel>
                <FormControl
                  name="specialization"
                  value={doctorDetails.specialization}
                  onChange={(value) => setDoctorDetails({...doctorDetails, specialization: value})}
                  errorMessage={doctorDetails.specialization ? null : "Specialization is required"}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  name="name"
                  value={doctorDetails.name}
                  onChange={(value) => setDoctorDetails({...doctorDetails, name: value})}
                  errorMessage={doctorDetails.name ? null : "Name is required"}
                />
              </FormGroup>
              {/* Add more form fields similarly */}
              {error && <Alert closable type="error" className="mt-3">{error}</Alert>}
              <Button appearance="primary" onClick={handleSubmit} loading={loading}>
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorAdd;
