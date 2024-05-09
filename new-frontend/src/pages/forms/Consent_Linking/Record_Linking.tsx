import PageContent from '@/components/PageContent';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Divider, Steps } from 'rsuite';
import Step0 from './Step0';
import Step1 from './Step1';
import Step2 from './Step2';
import FormHeader from './FormHeader';

const RecordLinking = () => {
    const location = useLocation();
    const recordId = location.state ? location.state.recordId : null;
    if(recordId === null) {
        console.error('Fuck off');
    }
    else {
        console.log(recordId);
    }

    const [step, setStep] = useState(0);
    const [txnId, setTxnId] = useState(-1);
    const otpSize = 6;
    const token = localStorage.getItem('token');
    
    const Step0Props = {
        recordId: recordId,
        token: token,
        setTxnId: setTxnId,
        step: step,
        setStep: setStep,
    }

    const Step1Props = {
        txnId: txnId,
        token: token,
        otpSize: otpSize,
        step: step,
        setStep: setStep,
    }

    const Step2Props = {

    }

    const forms = [Step0, Step1, Step2];
    const formProps = [Step0Props, Step1Props, Step2Props];
    const Form = forms[step];

  return (
    <PageContent>
        <Steps current={step}>
            <Steps.Item title='Initiate Linking'/>
            <Steps.Item title='Authenticate'/>
            <Steps.Item title='Linking Completed'/>
        </Steps>
        <Divider/>
        <Form {...formProps[step]}/>
    </PageContent>
  );
}

export default RecordLinking;