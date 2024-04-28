import React from 'react';
import BasicForm3 from './BasicForm';

import { Breadcrumb, Panel } from 'rsuite';

const Page = () => {
  return (
    <Panel
      header={
        <>
          <h3 className="title">Add Patient</h3>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item>Forms</Breadcrumb.Item>
            <Breadcrumb.Item active>Add Patient</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
      <BasicForm3 />
    </Panel>
  );
};

export default Page;
