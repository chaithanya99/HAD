import React, { useState } from 'react';
import { Steps, Divider, Stack, IconButton } from 'rsuite';
import PageContent from '@/components/PageContent';

import PageNextIcon from '@rsuite/icons/PageNext';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';

import Step1 from './Step1';
import ProjectInfoForm from './ProjectInfoForm';
import Completed from './Completed';
import axios from 'axios';

const HealthRecord = () => {
  const [step, setStep] = useState(0);
  const [txnId, setTxnId] = useState('');
  const token = localStorage.getItem('token');
  const [type, settype] = useState('')
  const [formData, setFormData] = useState({});
  const [pid, setPid] = useState(0);
  const [did, setDid] = useState(0);


  const step1Props = {
    step: step,
    setStep: setStep,
    type: type,
    settype: settype,
    did: did,
    setDid: setDid,
    pid: pid,
    setPid: setPid,
  };

  const projectInfoProps = {
    token: token,
    setTxnId: setTxnId,
    step: step,
    setStep: setStep,
    formtype: type,
    formData: formData,
    setFormData: setFormData,
    pid: pid,
    did: did,
  };

  const completedProps = {
    // Define variables and functions specific to Completed
    formData: formData,
    step: step, 
  };

  const forms = [Step1, ProjectInfoForm, Completed]
  const formProps = [step1Props, projectInfoProps, completedProps];
  const Form = forms[step];


  return (
    <PageContent>
      <Steps current={step}>
        <Steps.Item title="Choose Record Type" />
        <Steps.Item title="Create a Record" />
        <Steps.Item title="Completed" />
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

export default HealthRecord;
