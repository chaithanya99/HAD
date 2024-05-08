import React from 'react';
import VirtualizedTable5 from './MedicalRecordTable';

import { Breadcrumb, Panel } from 'rsuite';

const Page = () => {
  return (
    <Panel
      header={
        <>
          <h3 className="title">Medical Records</h3>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item>Tables</Breadcrumb.Item>
            <Breadcrumb.Item active>Medical Records</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
      <VirtualizedTable5/>
    </Panel>
  );
};

export default Page;
