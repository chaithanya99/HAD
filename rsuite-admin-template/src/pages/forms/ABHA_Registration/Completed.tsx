import React from 'react';
import { ButtonToolbar, Button, Stack ,Panel} from 'rsuite';
import CheckRoundIcon from '@rsuite/icons/CheckRound';

const Completed = () => {
  return (
    <div>
      <div style={{ margin: '40px 0' }}>
        <Stack spacing={10}>
          <CheckRoundIcon style={{ fontSize: 50 }} color="#4caf50" />
          <div>
            <h5>Your ABHA Number was successfully generated!</h5>
            <p className="text-muted">You can create an ABHA Address using the PHR App.</p>
          </div>
        </Stack>
      </div>
      
      <Panel header="ABHA Number" bordered style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
        <h4>1234567894165</h4>
      </Panel>
      
      <ButtonToolbar style={{ marginTop: 20 }}>
        <Button appearance="primary">Return to Dashboard</Button>
      </ButtonToolbar>
    </div>
  );
};

export default Completed;
