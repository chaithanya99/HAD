import React from 'react';
import UploadRecord from './UploadRecord';
import { Breadcrumb, Panel } from 'rsuite';

const Page = () => {
  return (
    <Panel
      header={
        <>
          <h3 className="title">Upload Medical Records</h3>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item>Forms</Breadcrumb.Item>
            <Breadcrumb.Item active>Upload Medical Records</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
      <UploadRecord/>
    </Panel>
  );
};

export default Page;
