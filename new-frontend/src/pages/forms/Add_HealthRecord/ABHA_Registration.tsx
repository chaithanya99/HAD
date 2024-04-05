import React, { useState } from 'react';
import { Steps, Divider, Stack, IconButton } from 'rsuite';
import PageContent from '@/components/PageContent';

import PageNextIcon from '@rsuite/icons/PageNext';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';

import Step1 from './Step1';
import ProjectInfoForm from './ProjectInfoForm';
import Completed from './Completed';
import axios from 'axios';

const HealthRec = () => {
  const otpSize = 6;
  const [step, setStep] = useState(0);
  const [txnId, setTxnId] = useState('');
  const token = localStorage.getItem('token');
  const [type, settype] = useState('')

  const step1Props = {
    step: step,
    setStep: setStep,
    type: type,
    settype: settype,
  };

  const projectInfoProps = {
    token: token,
    setTxnId: setTxnId,
    formtype: type,
  };

  const completedProps = {
    // Define variables and functions specific to Completed
  };

  const forms = [Step1, ProjectInfoForm, Completed]
  const formProps = [step1Props, projectInfoProps, completedProps];
  const Form = forms[step];

  // const handleSubmit = async (e) => {
    // e.preventDefault();
    // if (step === 1) {
    //   console.log(aadharNumber);
    //   // Check Aadhar number and "I agree" checkbox
    //   if (aadharNumber.length === 14 && Agree) {
    //     // Conditions met, proceed to the next step
    //     console.log(aadharNumber.split(' ').join(''));
    //     // try {
    //     const response = await axios.post("http://localhost:8080/generateOtp", {
    //       "aadhaar": aadharNumber.split(' ').join('')
    //     }, {
    //       headers: {
    //         'Authorization': `Bearer ${token}`
    //       }
    //     });
    //     setTxnId(response.data.txnId);
    //     console.log(response.data.txnId);
    //     // }
    //     // catch (error) {
    //     //   // Handle errors from the backend
    //     //   console.error('Error:', error.message);
    //     // }
    //   } else {
    //     // Display an error message or handle invalid input
    //     alert('Please enter a valid Aadhar number and check the agreement.');
    //   }
  //   } else if (step === 2) {
  //     // Add logic for other steps if needed
  //     // For example, OTP verification logic
  //     // ...
  //     // if (otp.length === otpSize && otp.every((digit) => Boolean(digit))) {
  //     //   const otpstring = otp.join('');
  //     //   console.log(otpstring);
  //     //   const response = await axios.post("http://localhost:8080/verifyAadhaarOTP", {
  //     //     txnId,
  //     //     "otp": otpstring
  //     //   }, {
  //     //     headers: {
  //     //       'Authorization': `Bearer ${token}`
  //     //     }
  //     //   });
  //     //   setStep(step + 1);
  //     //   console.log(response);
  //     // }
  //     // else {
  //     //   alert('Please enter complete OTP');
  //     // }

  //     try {
  //       if (Otp.length === otpSize && Otp.every((digit) => Boolean(digit))) {
  //         const actualOtp = Otp.join('')
  //         const response = await axios.post("http://localhost:8080/verifyAadhaarOTP", {
  //           txnId,
  //           otp: actualOtp
  //         }, {
  //           headers: {
  //             'Authorization': `Bearer ${token}`
  //           }
  //         });
  //         console.log(response.data); // Handle response accordingly
  //         setStep(step + 1);
  //         setOtp(new Array(otpSize).fill(""));
  //       }
  //       else {
  //         alert('Please enter complete OTP');
  //       }

  //       // Proceed to the next step or handle response
  //     } catch (error) {
  //       // Handle errors from the backend
  //       console.error('Error:', error.message);
  //     }
  //   } else if (step === 3) {
  //     try {
  //       if (mobileNumber.length === 10) {
  //         console.log(mobileNumber);
  //         const response = await axios.post("http://localhost:8080/checkAndGenerateMobileOTP", {
  //           txnId,
  //           "mobile": mobileNumber
  //         }, {
  //           headers: {
  //             'Authorization': `Bearer ${token}`
  //           }
  //         });
  //         console.log(response.data.mobileLinked);
  //         if (response.data.mobileLinked === "true") {
  //           const response = await axios.post("http://localhost:8080/generateHealthID", {
  //             txnId,
  //           }, {
  //             headers: {
  //               'Authorization': `Bearer ${token}`
  //             }
  //           });
  //           setAbhaId(response.data.healthIdNumber);
  //           setStep(step + 2);
  //         }
  //         else {
  //           setTimer(60);
  //           setStep(step + 1);
  //         }
  //       }
  //       else {
  //         alert('Enter Valid Mobile Number');
  //       }
  //     } catch (error) {
  //       // Handle errors from the backend
  //       console.error('Error:', error.message);
  //     }
  //   } else if (step === 4) {
  //     setOtp(new Array(otpSize).fill(""));
  //   }
    // }
  // }

  return (
    <PageContent>
      <Steps current={step}>
        <Steps.Item title="Patient Consent" />
        <Steps.Item title="Aadhaar Auth" />
        <Steps.Item title="ABHA Number" />
      </Steps>

      <Divider />
      <div className="wizard-form">
        <Form {...formProps[step]}/>

        <Divider />

        <Stack justifyContent="space-between">
          {step !== 0 && (
            <IconButton icon={<PagePreviousIcon />} onClick={() => setStep(Math.max(step - 1, 0))}>
              Back
            </IconButton>
          )}

          {step !== forms.length - 1 && (
            <IconButton
              icon={<PageNextIcon />}
              placement="right"
              appearance="primary"
              // onSubmit={handleSubmit}
              onClick={() => setStep(Math.min(step + 1, 4))}
            >
              Continue
            </IconButton>
          )}
        </Stack>
      </div>
    </PageContent>
  );
};

export default HealthRec;
