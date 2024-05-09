import React, { useEffect, useState } from 'react';
import { Input, InputGroup, Table, Button, DOMHelper, Progress, Checkbox, Stack, SelectPicker, ButtonToolbar } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import MoreIcon from '@rsuite/icons/legacy/More';
import DrawerView from './DrawerView';
import { mockUsers } from '@/data/mock';
import { NameCell, ImageCell, CheckCell, ActionCell } from './Cells';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const style = {
  width: 1,
  display: 'auto'
};
const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

const DataTable = () => {
  const location = useLocation();
  const initialPatient = location.state ? location.state.patient : null;
  const initialopen = location.state ? location.state.flag : false;

  const [showDrawer, setShowDrawer] = useState(initialopen);
  const [checkedKeys, setCheckedKeys] = useState<number[]>([]);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [data, setData] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const [key, setKey] = useState(0);
  const token = localStorage.getItem('token');
  


  const handleSortColumn = (sortColumn, sortType) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = window.localStorage.getItem('token');
        const response = await axios.get("http://localhost:8080/getAllConsents",
        {
          headers: {
            'Authorization': `Bearer ${storedToken}`,
          }
        });
        const updatedData = response.data.map(item => ({
          ...item,
          grantedOn: item.grantedOn || "Not Granted Yet" // If grantedOn is null, set it to "not granted yet"
        }));
        setData(updatedData);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/patients', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data);
        setPatientList(response.data);
      } catch(error) {
        console.error('Fetch Patients Failed: ', error.message);
      }
    };

    fetchData();
    fetchPatients();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = window.localStorage.getItem('token');
        const response = await axios.get("http://localhost:8080/getAllConsents",
        {
          headers: {
            'Authorization': `Bearer ${storedToken}`,
          }
        });
        const updatedData = response.data.map(item => ({
          ...item,
          grantedOn: item.grantedOn || "Not Granted Yet" // If grantedOn is null, set it to "not granted yet"
        }));
        setData(updatedData);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [key]);

  const handleGrant = async (rowData) => {
    try {
      const storedToken = window.localStorage.getItem('token');
      console.log(rowData);
      const response = await axios.post("http://localhost:8080/doctor/grant",{id:rowData},
      {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
        }
      });
      setKey(key+1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
        data={data}
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
          <NameCell dataKey="patientName" />
        </Column>

        <Column minWidth={50} flexGrow={1} sortable>
          <HeaderCell>ABHA Address</HeaderCell>
          <NameCell dataKey="abhaId" />
        </Column>

        <Column width={200} flexGrow={1}  sortable>
          <HeaderCell>Consent created on</HeaderCell>
          <Cell dataKey="createdOn" />
        </Column>
        <Column width={200} flexGrow={1} sortable >
          <HeaderCell>Consent granted on</HeaderCell>
          <Cell dataKey="grantedOn" />
        </Column>
        <Column width={200} flexGrow={1} >
          <HeaderCell>Consent expiry on</HeaderCell>
          <Cell dataKey="expiryOn" />
        </Column>
        <Column width={200} flexGrow={1} >
          <HeaderCell>Status</HeaderCell>
          <Cell dataKey="requestStatus" style={{marginRight: '30px',textAlign: 'left'}}>
            {rowData => {
              const statusColor = {
                Initialised: 'blue',
                Granted: 'green',
                Denied: 'red',
              }
              return (
                <span style={{ color: statusColor[rowData.requestStatus]}}>{rowData.requestStatus}</span>
              );
            }}
          </Cell>
        </Column>
        <Column width={200} fixed="right">
          <HeaderCell>Grant</HeaderCell>
          <Cell style={{ padding: '2px' }}>
            {/* <Button onClick={handleGrant} appearance="primary">
              Confirm
            </Button> */}
          
          {rowData => (
            <>
              <ButtonToolbar>
                <Button onClick={() => handleGrant(rowData.id)}>Grant</Button>
              </ButtonToolbar>
            </>
          )}
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

      <DrawerView open={showDrawer} patientList={patientList} initialPatient={initialPatient} onClose={() => setShowDrawer(false)} />
    </>
  );
};

export default DataTable;
