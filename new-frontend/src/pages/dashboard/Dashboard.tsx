import React, { useState, useEffect } from 'react';
import { Row, Col, Panel, ButtonGroup, Button } from 'rsuite';
import * as images from '../../images/charts';
import BarChart from './BarChart';
import PieChart from './PieChart';
import DataTable from './DataTable';
const token = localStorage.getItem('token');



const Dashboard = () => {
  const [doctorCount, setDoctorCount] = useState(null);
  const [workerCount, setWorkerCount] = useState(null); 
  const [patientCount, setPatientCount] = useState(null); 

  useEffect(() => {
    // Fetch doctor count when component mounts
    fetchDoctorCount();
    fetchWorkerCount();
    fetchPatientCount();
  }, []);

  const fetchDoctorCount = async () => {
    try {
      const response = await fetch('http://localhost:8080/admin/doctorCount', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      // Assuming the response structure is like { count: 81 }
      setDoctorCount(data);
    } catch (error) {
      console.error('Error fetching doctor count:', error);
    }
  };

  const fetchPatientCount = async () => {
    try {
      const response = await fetch('http://localhost:8080/admin/patientCount', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      // Assuming the response structure is like { count: 81 }
      setPatientCount(data);
    } catch (error) {
      console.error('Error fetching doctor count:', error);
    }
  };

  const fetchWorkerCount = async () => {
    try {
      const response = await fetch('http://localhost:8080/admin/workerCount', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log(data);
      // Assuming the response structure is like { count: 81 }
      setWorkerCount(data);
    } catch (error) {
      console.error('Error fetching doctor count:', error);
    }
  };
  return (
    <>
      <Row gutter={30} className="dashboard-header">
        <Col xs={8}>
          <Panel className="trend-box bg-gradient-red">
            <img className="chart-img" src={images.PVIcon} />
            <div className="title">Doctors </div>
            <div className="value">{doctorCount !== null ? doctorCount : 'Loading...'}</div>
          </Panel>
        </Col>
        <Col xs={8}>
          <Panel className="trend-box bg-gradient-green">
            <img className="chart-img" src={images.PVIcon} />
            <div className="title">Workers</div>
            <div className="value">{workerCount !== null ? workerCount : 'Loading...'}</div>
          </Panel>
        </Col>
        <Col xs={8}>
          <Panel className="trend-box bg-gradient-blue">
            <img className="chart-img" src={images.PVIcon} />
            <div className="title">Patients</div>
            <div className="value">{patientCount !== null ? patientCount : 'Loading...'}</div>
          </Panel>
        </Col>
      </Row>
{/* 
      <Row gutter={30}>
        <Col xs={16}>
          <BarChart
            title="Traffic Summary"
            actions={
              <ButtonGroup>
                <Button active>Day</Button>
                <Button>Week</Button>
                <Button>Month</Button>
              </ButtonGroup>
            }
            data={barChartData}
            type="bar"
            labels={[
              '2022-01-20',
              '2022-01-21',
              '2022-01-22',
              '2022-01-23',
              '2022-01-24',
              '2022-01-25',
              '2022-01-26',
              '2022-01-27',
              '2022-01-28',
              '2022-01-29',
              '2022-01-30',
              '2022-02-01',
              '2022-02-02',
              '2022-02-03',
              '2022-02-04',
              '2022-02-05',
              '2022-02-06',
              '2022-02-07',
              '2022-02-08',
              '2022-02-09',
              '2022-02-10',
              '2022-02-11',
              '2022-02-12',
              '2022-02-13',
              '2022-02-14',
              '2022-02-15',
              '2022-02-16',
              '2022-02-17',
              '2022-02-18',
              '2022-02-19',
              '2022-02-20',
              '2022-02-21',
              '2022-02-22',
              '2022-02-23',
              '2022-02-24',
              '2022-02-25',
              '2022-02-26'
            ]}
          />
        </Col>
        <Col xs={8}>
          <PieChart
            title="Traffic Sources"
            data={[112332, 123221, 432334, 342334, 133432]}
            type="donut"
            labels={['Direct', 'Internal', 'Referrals', 'Search Engines', 'Other']}
          />
        </Col>
      </Row> */}
      <Row gutter={30}>
        <Col xs={16}>
          <DataTable />
        </Col>
        <Col xs={8}>
          <PieChart
            title="Hospital Data"
            data={[doctorCount, workerCount, patientCount]}
            type="pie"
            labels={['Doctors', 'Health Workers', 'Patients']}
          />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
