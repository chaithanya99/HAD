import React from 'react';
import VirtualizedTable4 from './VirtualizedTable';

import { Breadcrumb, Panel } from 'rsuite';

const Page = () => {
  return (
    <Panel
      header={
        <>
          <h3 className="title">Consent Tracker</h3>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item>Tables</Breadcrumb.Item>
            <Breadcrumb.Item active>Consents</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
      <VirtualizedTable4/>
    </Panel>
  );
};

export default Page;
