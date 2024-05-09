import React from 'react';
import RecordLinking from './Record_Linking';
import { Breadcrumb, Panel } from 'rsuite';

const Page = () => {
  return (
    <Panel
      header={
        <>
          <h3 className="title">Link Health Record</h3>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item>Forms</Breadcrumb.Item>
            <Breadcrumb.Item active>Link Health Record</Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
      <RecordLinking/>
    </Panel>
  );
};

export default Page;
