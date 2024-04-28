import React, { useState } from 'react';
import {
  Input,
  InputGroup,
  Table,
  Button,
  DOMHelper,
  Progress,
  Checkbox,
  Stack,
  SelectPicker
} from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import MoreIcon from '@rsuite/icons/legacy/More';
import DrawerView from './DrawerView';
import { mockUsers } from '@/data/mock';
import { NameCell, ImageCell, CheckCell, ActionCell } from './Cells';

const data = mockUsers(5);
const style = {
  width: 1,
  display: 'auto'
};
const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

const ratingList = Array.from({ length: 5 }).map((_, index) => {
  return {
    value: index + 1,
    label: Array.from({ length: index + 1 })
      .map(() => '⭐️')
      .join('')
  };
});

const DataTable = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState<number[]>([]);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [rating, setRating] = useState<number | null>(null);

  let checked = false;
  let indeterminate = false;

  if (checkedKeys.length === data.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
    indeterminate = true;
  }

  const handleCheckAll = (_value, checked) => {
    const keys = checked ? data.map(item => item.id) : [];
    setCheckedKeys(keys);
  };
  const handleCheck = (value, checked) => {
    const keys = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value);
    setCheckedKeys(keys);
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  const filteredData = () => {
    const filtered = data.filter(item => {
      if (!item.name.includes(searchKeyword)) {
        return false;
      }

      if (rating && item.rating !== rating) {
        return false;
      }

      return true;
    });

    if (sortColumn && sortType) {
      return filtered.sort((a, b) => {
        let x: any = a[sortColumn];
        let y: any = b[sortColumn];

        if (typeof x === 'string') {
          x = x.charCodeAt(0);
        }
        if (typeof y === 'string') {
          y = y.charCodeAt(0);
        }

        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return filtered;
  };

  return (
    <>
      <Stack className="table-toolbar" justifyContent="space-between">
        <Button appearance="primary" onClick={() => setShowDrawer(true)}>
          Create Consent Request
        </Button>

        <Stack spacing={6}>
          {/* <SelectPicker
            label="Rating"
            data={ratingList}
            searchable={false}
            value={rating}
            onChange={setRating}
          /> */}
          <InputGroup inside>
            <Input placeholder="Search by name" value={searchKeyword} onChange={setSearchKeyword} />
            <InputGroup.Addon>
              <SearchIcon />
            </InputGroup.Addon>
          </InputGroup>
        </Stack>
      </Stack>

      <Table
        height={Math.max(getHeight(window) - 200, 400)}
        data={filteredData()}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
      >
        <Column width={100} align="center" fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column minWidth={100} flexGrow={1} sortable>
          <HeaderCell>Name</HeaderCell>
          <NameCell dataKey="name" />
        </Column>

        <Column minWidth={50} flexGrow={1} sortable>
          <HeaderCell>ABHA Address</HeaderCell>
          <NameCell dataKey="abha_id" />
        </Column>

        <Column width={200} flexGrow={1} >
          <HeaderCell>Consent created on</HeaderCell>
          <Cell dataKey="date" />
        </Column>
        <Column width={200} flexGrow={1} >
          <HeaderCell>Consent granted on</HeaderCell>
          <Cell dataKey="date" />
        </Column>
        <Column width={200} flexGrow={1} >
          <HeaderCell>Consent expiry on</HeaderCell>
          <Cell dataKey="date" />
        </Column>
        <Column width={200} flexGrow={1} >
          <HeaderCell>Status</HeaderCell>
          <Cell dataKey="status" style={{marginRight: '30px',textAlign: 'left'}}>
            {rowData => {
              const statusColor = {
                Processing: 'blue',
                Accepted: 'green',
                Rejected: 'red',
              }[rowData.status];

              return (
                <span style={{ color: statusColor }}>{rowData.status}</span>
              );
            }}
          </Cell>
        </Column>
        {/* <Column width={100} sortable>
          <HeaderCell>Rating</HeaderCell>
          <Cell dataKey="rating">
            {rowData =>
              Array.from({ length: rowData.rating }).map((_, i) => <span key={i}>⭐️</span>)
            }
          </Cell>
        </Column> */}

        {/* <Column width={100} sortable>
          <HeaderCell>Income</HeaderCell>
          <Cell dataKey="amount">{rowData => `$${rowData.amount}`}</Cell>
        </Column> */}

        {/* <Column width={120}>
          <HeaderCell>
            <MoreIcon />
          </HeaderCell>
          <ActionCell dataKey="id" />
        </Column> */}
      </Table>

      <DrawerView open={showDrawer} onClose={() => setShowDrawer(false)} />
    </>
  );
};

export default DataTable;
