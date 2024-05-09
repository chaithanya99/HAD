import React from 'react';
import { Table, Panel } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

const data = [
  {
    id: 1,
    url: 'https://sandbox.abdm.gov.in/abdm-docs/getting-started',
    Description: 'ABDM latest Documentation',
  },
  {
    id: 2,
    url: 'https://www.youtube.com/playlist?list=PLYcj0BpCoCc5zf_5Z2QRw90yUbQbnXiOr',
    Description: 'ABDM webinars',
  },
  {
    id: 3,
    url: 'https://sandbox.abdm.gov.in/sandbox/v3/documentation?doc=building_blocks',
    Description: 'Sandbox link',
  },
  {
    id: 4,
    url: 'https://www.india.gov.in/',
    Description: 'National portal of india',
  },
  {
    id: 5,
    url: 'https://nha.gov.in/',
    Description: 'National Health Authority of India',
  },
  {
    id: 6,
    url: 'https://play.google.com/store/apps/details?id=in.ndhm.phr&pcampaignid=web_share',
    Description: 'ABDM ABHA app',
  }
];

const DataTable = () => {
  return (
    <Panel className="card" header="Important ABDM Links">
      <Table height={300} data={data} rowKey="id">
        <Column flexGrow={1} minWidth={100}>
          <HeaderCell>PAGE NAME </HeaderCell>
          <Cell>
            {rowData => {
              return (
                <a href={rowData.url} target="_blank" rel="noreferrer">
                  {rowData.url}
                </a>
              );
            }}
          </Cell>
        </Column>

        <Column width={250}>
          <HeaderCell>DESCRIPTION</HeaderCell>
          <Cell dataKey="Description" />
        </Column>

      </Table>
    </Panel>
  );
};

export default DataTable;
