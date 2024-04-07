import React from 'react';
import { ButtonToolbar, Button, Stack ,Panel} from 'rsuite';
import CheckRoundIcon from '@rsuite/icons/CheckRound';
import { useNavigate } from 'react-router-dom';

const Completed = ({formData, step}) => {
  const navigate = useNavigate();
  console.log("Form data:", formData);
  console.log("Step:", step);
  return (
    <div>
      <div style={{ margin: '40px 0' }}>
        <Stack spacing={10}>
          <CheckRoundIcon style={{ fontSize: 50 }} color="#4caf50" />
          <div>
            <h5>Your Record is successfully created!</h5>
          </div>
        </Stack>
      </div>
      
      
      <ButtonToolbar style={{ marginTop: 20 }}>
        <Button appearance="primary" onClick={() => {navigate('/dashboard')}}>Return to Dashboard</Button>
      </ButtonToolbar>
    </div>
  );
};

export default Completed;
