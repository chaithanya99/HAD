import React, { useEffect, useState } from 'react';
import { DOMHelper, Table, Button } from 'rsuite'; // Import Button from rsuite
import { mockUsers } from '@/data/mock';
import axios from 'axios';

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

const calculateAge = (yearOfBirth) => {
  const currentYear = new Date().getFullYear(); // Get current year
  return currentYear - yearOfBirth;
};

const VirtualizedTable5 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.post("http://localhost:8080/auth/generateToken", {
          "username" : "admin",
          "password": "admin"
        });
        const response = await axios.get("http://localhost:8080/admin/workers", {
          headers: {
            'Authorization': `Bearer ${response1.data}`
          }
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Custom cell renderer for buttons
  const renderButtons = (rowData) => (
    <Cell>
      {/* Example buttons */}
      <Button appearance="primary">Edit</Button>
      <Button appearance="primary">Delete</Button>
      <Button appearance="primary">View</Button>
    </Cell>
  );

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

      <Column width={130}>
        <HeaderCell>Name</HeaderCell>
        <Cell dataKey="name" />
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
        <HeaderCell>City</HeaderCell>
        <Cell dataKey="address" />
      </Column>

      <Column minWidth={200} flexGrow={1}>
        <HeaderCell>Email</HeaderCell>
        <Cell dataKey="email_Id" />
      </Column>
    </Table>
  );
};

export default VirtualizedTable5;
