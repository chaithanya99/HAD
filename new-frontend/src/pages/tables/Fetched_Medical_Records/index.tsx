import React from 'react';
import FetchedMedicalRecords from './FetchedMedicalRecords';

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
            <Breadcrumb.Item active>Fetched Medical Records</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
      <FetchedMedicalRecords/>
    </Panel>
  );
};

export default Page;
