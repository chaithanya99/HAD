import React, { useState, useEffect } from 'react';
import { mockUsers } from '@/data/mock';
import { NameCell, ImageCell, CheckCell, ActionCell } from './Cells';
import DrawerView from './DrawerView';
import {Input,InputGroup,Table,Button,DOMHelper,Progress,Checkbox,Stack,SelectPicker,Icon,Whisper} from 'rsuite';
import Tooltip from 'rsuite/Tooltip';
import { LuClock } from "react-icons/lu";
import { GrDocumentUpload } from "react-icons/gr";
import { FaEdit,FaEye} from 'react-icons/fa';
import FileUploadIcon from '@rsuite/icons/FileUpload';
import SearchIcon from '@rsuite/icons/Search';
import { IconButton, ButtonToolbar } from 'rsuite';
import ConsentRequestModal from '/src/pages/tables/Patient_Tracker/ConsentRequestModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { values } from 'lodash';
import PlusIcon from '@rsuite/icons/Plus';
import { IoMdCreate } from "react-icons/io";

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

const FieldList = [{
  value:'name',
  label:"Name"
},{
  value:'abhaNumber',
  label:"ABHA ID"
},{
  value:'mobile',
  label:"Mobile"
},{
  value:'gender',
  label:"Gender"
}];

const DataTable = () => {
  const [editable, setEditable] = React.useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState<number[]>([]);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [patientList, setPatientList] = useState([]);
  const [columnSearch, setColumnSearch] = useState('name');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/patients', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        console.log(response.data);
        setPatientList(response.data.map(value => ({
          ...value,
          gender: (value.gender === 'M')?'Male':'Female'
        })));
      } catch(error) {
        console.error('Fetching All Patients Failed: ', error.message);
      }
    };

    fetchPatients();
  }, []);

  const navigate = useNavigate();

  const handleSortColumn = (sortColumn, sortType) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  const filteredData = () => {
    // Apply filtering logic only if there's a searchKeyword
    console.log(`Search Keyword: ${searchKeyword}`, '\n', `Column search: ${columnSearch}`);
    if (searchKeyword && columnSearch) {
      if(columnSearch === 'name') {
        return patientList.filter(patient => patient.name.toLowerCase().includes(searchKeyword.toLowerCase()));
      }
      else if(columnSearch === 'gender') {
        return patientList.filter(patient => patient.gender.toLowerCase().includes(searchKeyword.toLowerCase()));
      }
      else if(columnSearch === 'abhaNumber') {
        return patientList.filter(patient => patient.abhaNumber.toLowerCase().includes(searchKeyword.toLowerCase()));
      }
      else if(columnSearch === 'mobile') {
        return patientList.filter(patient => patient.mobile.toLowerCase().includes(searchKeyword.toLowerCase()));
      }
    } else {
      return patientList;
    }
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
            label="Field"
            data={FieldList}
            searchable={false}
            // value={rating}
            // onChange={(value) => {
              // console.log(value);
              // setRating(value);
            // }}
            value={columnSearch}
            onChange={(value) => {
              console.log(value);
              setColumnSearch(value);
            }}
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

        <Column width={145} sortable>
          <HeaderCell>ABHA Id</HeaderCell>
          <Cell dataKey="abhaNumber" />
        </Column>

        <Column width={120} sortable>
          <HeaderCell>Mobile</HeaderCell>
          <Cell dataKey="mobile" />
        </Column>

        <Column width={260} fixed="right">
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
                  <IconButton onClick = {() => {
                      const date = new Date();
                      date.setHours(0);
                      date.setMinutes(0);
                      date.setSeconds(0);
                      const formData = {
                        id: '',
                        patientId: rowData.abhaNumber,
                        title: 'Appointment',
                        allDay: false,
                        start: date,
                        end: date,
                        notes: '',
                      }
                      const initialPatient = {
                        value: rowData.abhaNumber,
                        label: rowData.name,
                      }
                      navigate('/calendar', {state: {
                        formData: formData,
                        initialPatient: initialPatient,
                      }});
                  }}color="yellow" appearance="link" icon={<LuClock />} />
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
                  <IconButton onClick = {() => {
                      const patient = rowData;
                      navigate('/table-virtualized5', {state:{
                        patient: patient,
                        patientList: patientList,
                      }});
                  }}color="green" appearance="link" icon={<FaEye />} />
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
                  <IconButton onClick = {() => {
                      const patient = rowData;
                      navigate('/HealthRecord', {state: {
                        patient: patient,
                      }});
                  }}color="red" appearance="link" icon={<IoMdCreate/>} />
                </Whisper>

                <Whisper
                  controlId="control-id-container"
                  preventOverflow
                  trigger="hover"
                  speaker={
                    <Tooltip style={{ width: 120 }}>
                      Upload a Health Record.
                    </Tooltip>
                  }
                  placement="auto">
                  <IconButton onClick = {() => {
                      const selectedPatient = {
                        value: rowData.abhaNumber,
                        label: rowData.name,
                      }
                      navigate('/UploadRecord', {state: {selectedPatient: selectedPatient}});
                  }}color="blue" appearance="link" icon={<FileUploadIcon />} />
                </Whisper>

                <Whisper
                  controlId="control-id-container"
                  preventOverflow
                  trigger="hover"
                  speaker={
                    <Tooltip style={{ width: 120 }}>
                      View Fetched Records.
                    </Tooltip>
                  }
                  placement="auto">
                  <IconButton onClick = {() => {
                      const patient = rowData;
                      navigate('/FetchedMedicalRecords', {state:{
                        patient: patient,
                        patientList: patientList,
                      }});
                  }}color="red" appearance="link" icon={<FaEye />} />
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
                  <IconButton onClick = {() => {
                    const patient = rowData;
                    navigate('/table-virtualized4', {state: {
                      patient: patient,
                      flag: true,
                    }});
                  }}color="blue" appearance="link" icon={<FaEdit />} />
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
