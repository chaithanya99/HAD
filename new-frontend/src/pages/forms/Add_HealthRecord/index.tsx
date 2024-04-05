import React from 'react';
import HealthRecord from './HealthRecord';

import { Breadcrumb, Panel } from 'rsuite';

const Page = () => {
  return (
    <Panel
      header={
        <>
          <h3 className="title">Health Record</h3>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item>Forms</Breadcrumb.Item>
            <Breadcrumb.Item active>Health Record</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
      <HealthRecord />
    </Panel>
  );
};

export default Page;
