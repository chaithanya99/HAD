import React from 'react';
import BasicForm from './BasicForm';

import { Breadcrumb, Panel } from 'rsuite';

const Page = () => {
  return (
    <Panel
      header={
        <>
          <h3 className="title">Add Doctor</h3>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item>Forms</Breadcrumb.Item>
            <Breadcrumb.Item active>Add Doctor</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
      <BasicForm />
    </Panel>
  );
};

export default Page;
