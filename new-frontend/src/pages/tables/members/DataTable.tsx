import React, { useState } from 'react';
import { mockUsers } from '@/data/mock';
import { NameCell, ImageCell, CheckCell, ActionCell } from './Cells';
import DrawerView from './DrawerView';
import {Input,InputGroup,Table,Button,DOMHelper,Progress,Checkbox,Stack,SelectPicker,Icon,Whisper} from 'rsuite';
import Tooltip from 'rsuite/Tooltip';
import { LuClock } from "react-icons/lu";
import { GrDocumentUpload } from "react-icons/gr";
import { FaEdit,FaEye} from 'react-icons/fa';
import SearchIcon from '@rsuite/icons/Search';
import { IconButton, ButtonToolbar } from 'rsuite';
import ConsentRequestModal from '/src/pages/tables/members/ConsentRequestModal';
import EventModal from './EventModal';
const data = mockUsers(6);

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
  const [editable, setEditable] = React.useState(false);
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
      <ConsentRequestModal
        open={editable}
        onClose={() => setEditable(false)}
        onAddEvent={() => {
          setEditable(false);
        }}/>
      <Stack className="table-toolbar">
        <Stack spacing={6}>
          <SelectPicker
            label="ABHA ID"
            data={ratingList}
            searchable={false}
            value={rating}
            onChange={setRating}
          />
          <InputGroup inside>
            <Input placeholder="Search" value={searchKeyword} onChange={setSearchKeyword} />
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
        onSortColumn={handleSortColumn}>
        <Column width={80} align="center" fixed sortable>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={190} sortable>
          <HeaderCell>Name</HeaderCell>
          <NameCell dataKey="name" />
        </Column>

        <Column width={90} sortable>
          <HeaderCell>Gender</HeaderCell>
          <Cell dataKey="gender">{rowData => `${rowData.gender}`}</Cell>
        </Column>

        <Column width={120} sortable>
          <HeaderCell>ABHA Id</HeaderCell>
          <Cell dataKey="abha_id" />
        </Column>

        <Column width={200} sortable>
          <HeaderCell>Email</HeaderCell>
          <Cell dataKey="email" />
        </Column>

        <Column width={200} fixed="right">
          <HeaderCell>Actions</HeaderCell>
          <Cell style={{ padding: '2px' }}>
            {rowData => (
                <ButtonToolbar>
                    <Whisper
                      controlId="control-id-container"
                      preventOverflow
                      trigger="hover"
                      speaker={
                        <Tooltip style={{ width: 120 }}>
                           Set an Appointment.
                        </Tooltip>
                      }
                      placement="auto">
                      <IconButton color="yellow" appearance="link" icon={<LuClock />} />
                    </Whisper>

                    <Whisper
                      controlId="control-id-container"
                      preventOverflow
                      trigger="hover"
                      speaker={
                        <Tooltip style={{ width: 120 }}>
                          View Health Records.
                        </Tooltip>
                      }
                      placement="auto">
                      <IconButton color="green" appearance="link" icon={<FaEye />} />
                    </Whisper>
                    
                    <Whisper
                      controlId="control-id-container"
                      preventOverflow
                      trigger="hover"
                      speaker={
                        <Tooltip style={{ width: 120 }}>
                          Create a Health Record.
                        </Tooltip>
                      }
                      placement="auto">
                      <IconButton color="red" appearance="link" icon={<GrDocumentUpload/>} />
                    </Whisper>

                    <Whisper
                      controlId="control-id-container"
                      preventOverflow
                      trigger="hover"
                      speaker={
                        <Tooltip style={{ width: 120 }}>
                          Create a consent Request.
                        </Tooltip>
                      }
                      placement="auto">
                      <IconButton color="blue" appearance="link" icon={<FaEdit />} />
                    </Whisper>
                </ButtonToolbar>
            )}
          </Cell>
        </Column>
      </Table>
      <DrawerView open={showDrawer} onClose={() => setShowDrawer(false)} />
    </>
    
  );
};

export default DataTable;
