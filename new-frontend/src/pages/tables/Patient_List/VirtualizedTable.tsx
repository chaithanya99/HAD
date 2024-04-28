import React, { useEffect, useState } from 'react';
import { DOMHelper, Table } from 'rsuite';
import { mockUsers } from '@/data/mock';
import axios from 'axios';

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

// const data = mockUsers(1000);
const calculateAge = (yearOfBirth) => {
  const currentYear = new Date().getFullYear(); // Get current year
  return currentYear - yearOfBirth;
};

const VirtualizedTable3 = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.post("http://localhost:8080/auth/generateToken",
        {
          "username" : "admin",
          "password": "admin"
        });
        const response = await axios.get("http://localhost:8080/admin/patients",
        {
          headers: {
            'Authorization': `Bearer ${response1.data}`
          }
        });
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Table
      virtualized
      height={Math.max(getHeight(window) - 120, 400)}
      data={data}
      translate3d={false}
    >
      <Column width={70} align="center" fixed>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column width={180}>
        <HeaderCell>Name</HeaderCell>
        <Cell dataKey="name" />
      </Column>

      <Column width={180}>
        <HeaderCell>ABHA Number</HeaderCell>
        <Cell dataKey="abhaNumber" />
      </Column>

      <Column width={100}>
        <HeaderCell>Gender</HeaderCell>
        <Cell dataKey="gender" />
      </Column>

      <Column width={100}>
        <HeaderCell>Age</HeaderCell>
        <Cell dataKey="yearOfBirth">
          {(rowData) => calculateAge(rowData.yearOfBirth)}
        </Cell>
      </Column>

      <Column width={200}>
        <HeaderCell>State</HeaderCell>
        <Cell dataKey="state" />
      </Column>

      <Column minWidth={200} flexGrow={1}>
        <HeaderCell>Mobile Number</HeaderCell>
        <Cell dataKey="mobile" />
      </Column>

      <Column minWidth={200} flexGrow={1}>
        <HeaderCell>ABHA Address</HeaderCell>
        <Cell dataKey="abha_address" />
      </Column>
    </Table>
    
  );
};

export default VirtualizedTable3;
