import React, { useState } from 'react';
import { Steps, Divider, Stack, IconButton } from 'rsuite';
import PageContent from '@/components/PageContent';

import PageNextIcon from '@rsuite/icons/PageNext';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';

import ProjectTypeForm from './ProjectTypeForm';
import TeamSettingsForm from './TeamSettingsForm';
import BusinessDetailForm from './BusinessDetailForm';
import ProjectInfoForm from './ProjectInfoForm';
import Completed from './Completed';

const forms = [ProjectTypeForm, ProjectInfoForm, TeamSettingsForm, BusinessDetailForm, Completed];

const WizardForm = () => {
  const [step, setStep] = useState(0);
  const Form = forms[step];
  return (
    <PageContent>
      <Steps current={step}>
        <Steps.Item title="Patient Consent" />
        <Steps.Item title="Aadhaar Auth" />
        <Steps.Item title="Link Mobile" />
        <Steps.Item title="Verify Mobile" />
        <Steps.Item title="ABHA Number" />
      </Steps>

      <Divider />
      <div className="wizard-form">
        <Form />

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

export default WizardForm;
