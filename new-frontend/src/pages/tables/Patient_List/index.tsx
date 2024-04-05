import React from 'react';
import VirtualizedTable3 from './VirtualizedTable';

import { Breadcrumb, Panel } from 'rsuite';

const Page = () => {
  return (
    <Panel
      header={
        <>
          <h3 className="title">Patient list</h3>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item>Tables</Breadcrumb.Item>
            <Breadcrumb.Item active>Patient list</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
      <VirtualizedTable3/>
    </Panel>
  );
};

export default Page;
