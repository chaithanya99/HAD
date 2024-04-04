import React from 'react';
import VirtualizedTable2 from './VirtualizedTable';

import { Breadcrumb, Panel } from 'rsuite';

const Page = () => {
  return (
    <Panel
      header={
        <>
          <h3 className="title">Nurse list</h3>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item>Tables</Breadcrumb.Item>
            <Breadcrumb.Item active>Nurse list</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
      <VirtualizedTable2/>
    </Panel>
  );
};

export default Page;
