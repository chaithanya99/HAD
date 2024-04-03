import React from 'react';
import BasicForm2 from './BasicForm';

import { Breadcrumb, Panel } from 'rsuite';

const Page = () => {
  return (
    <Panel
      header={
        <>
          <h3 className="title">Add Nurse</h3>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item>Forms</Breadcrumb.Item>
            <Breadcrumb.Item active>Add Nurse</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
      <BasicForm2 />
    </Panel>
  );
};

export default Page;
