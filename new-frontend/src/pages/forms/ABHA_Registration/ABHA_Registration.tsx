import React, { useEffect, useState } from 'react';
import { Steps, Divider, Stack, IconButton } from 'rsuite';
import PageContent from '@/components/PageContent';

import PageNextIcon from '@rsuite/icons/PageNext';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';

const ABHA_Registration = () => {
  const otpSize = 6;
  const retryTime = 30;
  const [step, setStep] = useState(0);
  const [txnId, setTxnId] = useState('');
  const [aadharNumber, setAadharNumber] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [abhaId, setAbhaId] = useState('')
  const token = localStorage.getItem('token');

  useEffect(() => {
    console.log(token);
  }, []);

  const step1Props = {
    setAadharNumber: setAadharNumber,
    aadharNumber: aadharNumber,
    token: token,
    setTxnId: setTxnId,
    step: step,
    setStep: setStep,
  };

  const step2Props = {
    otpSize: otpSize,
    txnId: txnId,
    step: step,
    setStep: setStep,
    aadharNumber: aadharNumber,
    token: token,
    retryTime: retryTime,
  };

  const step3Props = {
    mobileNumber: mobileNumber,
    setMobileNumber: setMobileNumber,
    txnId: txnId,
    token: token,
    setAbhaId: setAbhaId,
    step: step,
    setStep: setStep,
  };

  const step4Props = {
    mobileNumber: mobileNumber,
    otpSize: otpSize,
    retryTime: retryTime,
    token: token,
    step: step,
    setStep: setStep,
    txnId: txnId,
  };

  const step5Props = {
    abhaId: abhaId,
    step: step,
    setStep: setStep,
  };

  const step6Props = {
    abhaId: abhaId,
    token: token,
  };

  const forms = [Step1, Step2, Step3, Step4, Step5, Step6]
  const formProps = [step1Props, step2Props, step3Props, step4Props, step5Props, step6Props];
  const Form = forms[step];

  return (
    <PageContent>
      <Steps current={step}>
        <Steps.Item title="Patient Consent" />
        <Steps.Item title="Aadhaar Auth" />
        <Steps.Item title="Link Mobile" />
        <Steps.Item title="Verify Mobile" />
        <Steps.Item title="ABHA Number" />
        <Steps.Item title="ABHA Address" />
      </Steps>

      <Divider />
      <div className="wizard-form">
        <Form {...formProps[step]}/>

        {/* <Divider /> */}

        {/* <Stack justifyContent="space-between">
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
        </Stack> */}
      </div>
    </PageContent>
  );
};

export default ABHA_Registration;
