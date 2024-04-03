import React from 'react';
import WizardForm from './WizardForm';

import { Breadcrumb, Panel } from 'rsuite';

const Page = () => {
  return (
    <Panel
      header={
        <>
          <h3 className="title">ABHA Registration</h3>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item>Forms</Breadcrumb.Item>
            <Breadcrumb.Item active>ABHA Registration</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
      <WizardForm />
    </Panel>
  );
};

export default Page;
