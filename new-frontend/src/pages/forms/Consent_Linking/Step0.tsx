import axios from 'axios';
import React, { useEffect } from 'react';
import { Loader, Stack } from 'rsuite';

const Step0 = ({ recordId, token, setTxnId, step, setStep }) => {

  useEffect(() => {
    const postReq = async () => {
      try {
        const response = await axios.post('http://localhost:8080/HealthRecord/linkOPConsultRecord', {
          healthRecordId: recordId,
          notes: "Record Linking",
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        console.log(response);
        setTxnId(response.data.requestId);
        console.log(step);
        setStep(step+1);

      } catch(error) {
        console.error('Posting Step1 of Care Context Linking Failed: ', error.message);
      }
    };

    postReq();
  }, [])
  
  return (
    <div style={{ margin: '40px 0' }}>
        <Stack spacing={10}>
          <Loader size='md'/>
          <div>
            <h5>Initiating Health Record Linking</h5>
          </div>
        </Stack>
      </div>
  );
};

export default Step0;