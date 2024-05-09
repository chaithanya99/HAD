import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonToolbar, Stack } from 'rsuite';
import CheckRoundIcon from '@rsuite/icons/CheckRound';

const Step2 = ({  }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ margin: '40px 0' }}>
        <Stack spacing={10}>
          <CheckRoundIcon style={{ fontSize: 50 }} color="#4caf50" />
          <div>
            <h5>Health Record is Successfully Linked!</h5>
          </div>
        </Stack>
      </div>
      
      
      <ButtonToolbar style={{ marginTop: 20 }}>
        <Button appearance="primary" onClick={() => {
          navigate('/dashboard');
        }}>
          Return to Dashboard
        </Button>
      </ButtonToolbar>
    </div>
  );

};

export default Step2;