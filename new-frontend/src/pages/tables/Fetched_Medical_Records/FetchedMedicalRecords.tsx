import React, { useEffect, useState } from 'react';
import { DOMHelper, Table, Button, ButtonToolbar, Modal, Loader, Divider } from 'rsuite';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { record } from 'schema-types';

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

const FetchedMedicalRecords = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const location = useLocation();

  const initialPatient = location.state ? location.state.patient : null;
  console.log(initialPatient);
  const initialPatientList = location.state ? location.state.patientList : null;

  const [patient, setPatient] = useState(initialPatient);
  const [patientList, setPatientList] = useState(initialPatientList);
  const [data, setData] = useState([]);
  const [openRowData, setOpenRowData] = useState(null); // Track the data of the currently opened row
  const [modalOpen, setModalOpen] = useState(false); // Define modalOpen state
  const [rows, setRows] = useState(0);
  const token = localStorage.getItem('token');

  const handleOpen = async (rowData) => {
    if (rowData.type === 'Diagnostic Report') {
      try {
        const response = await axios.get(`http://localhost:8080/HealthRecord/getDiagnosticReport/${rowData.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setOpenRowData(response.data);
      } catch (error) {
        console.error("Error fetching diagnostic report:", error);
      }
    }
    else if (rowData.type === 'Discharge Summary') {
      try {
        const response = await axios.get(`http://localhost:8080/HealthRecord/getDischargeSummaryReport/${rowData.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setOpenRowData(response.data);
      } catch (error) {
        console.error("Error fetching discharge summary report:", error);
      }
    }
    else if (rowData.type === 'General health report') {
      try {
        const response = await axios.get(`http://localhost:8080/HealthRecord/getGeneralReport/${rowData.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setOpenRowData(response.data);
      } catch (error) {
        console.error("Error fetching general report:", error);
      }
    }
    else if (rowData.type === 'Immunization Record') {
      try {
        const response = await axios.get(`http://localhost:8080/HealthRecord/getImmunizationRecord/${rowData.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setOpenRowData(response.data);
      } catch (error) {
        console.error("Error fetching immunization report:", error);
      }
    }
    else if (rowData.type === 'OP consult') {
      try {
        const response = await axios.get(`http://localhost:8080/HealthRecord/getOPConsultReport/${rowData.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setOpenRowData(response.data);
      } catch (error) {
        console.error("Error fetching OP consult report:", error);
      }
    }
    else if (rowData.type === 'Prescription') {
      try {
        const response = await axios.get(`http://localhost:8080/HealthRecord/getPrescription/${rowData.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setOpenRowData(response.data);
      } catch (error) {
        console.error("Error fetching prescription report:", error);
      }
    }
    else if (rowData.type === 'Wellness Record') {
      try {
        const response = await axios.get(`http://localhost:8080/HealthRecord/getWellnessRecord/${rowData.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setOpenRowData(response.data);
      } catch (error) {
        console.error("Error fetching wellness record report:", error);
      }
    }
    else{
      setOpenRowData(rowData); // Set the data of the currently opened row
    }
    setModalOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpenRowData(null); // Clear the data of the currently opened row
    setModalOpen(false); // Close the modal
  };

  const handleEntered = () => {
    setTimeout(() => setRows(80), 2000);
  };

  const PdfViewer = ({ base64Pdf }) => {
    const [pageNo, setPageNo] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const goToPrevPage = () => {
      setPageNo((pageNo-1 <= 1) ? 1 : pageNo-1);
    };
  
    const goToNextPage = () => {
      setPageNo((pageNo+1 >= totalPages) ? totalPages : pageNo+1);
    }

    return (
      // <PDFViewer width="1000" height="600">
      <>
        <nav>
          <Button onClick={goToPrevPage}>
            Prev
          </Button>
          <Button onClick={goToNextPage}>
            Next
          </Button>
          <p>
            Page {pageNo} of {totalPages}
          </p>
        </nav>
        <Document
          // file={`data:application/pdf;base64,${base64Pdf}`}
          file={`data:application/pdf;base64,${base64Pdf}`}
          onLoadSuccess={(value) => {console.log(value);
            setTotalPages(value.numPages);
          }}
        >
          <Page
          pageNumber={pageNo}
          renderTextLayer={false}
          renderAnnotationLayer={true}
          />
        </Document>
      </>
      // </PDFViewer>
    );
  };

  const renderModal = (rowData) => {
    if (!openRowData) return null; // Render nothing if no row is currently opened
    console.log(openRowData.type)

    return (
      <>
        {openRowData.type != 'PDF' && (
          <Modal
            open={modalOpen}
            onClose={handleClose}
            onEntered={handleEntered}
            onExited={() => {
              setRows(0);
            }}
          >
            <Modal.Header>
              <Modal.Title>{openRowData.type}</Modal.Title>
            </Modal.Header>
            <Divider/>
            <Modal.Body>
              {rows ? (
                <div>
                {Object.entries(openRowData).map(([key, value]) => (
                  <p key={key}><strong>{key}:</strong> {value}</p>
                ))}
              </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <Loader size="md" />
                </div>
              )}
            </Modal.Body>
          </Modal>
        )}

        {openRowData.type === 'PDF' && (
          <Modal
            open={modalOpen}
            onClose={handleClose}
            onEntered={handleEntered}
            onExited={() => {
              setRows(0);
            }}
            style={{textAlign: 'center'}}>
            <Modal.Header>
              <Modal.Title style={{textAlign: 'center'}}>PDF Render</Modal.Title>
            </Modal.Header>
            <Divider/>
            <Modal.Body>
              <PdfViewer base64Pdf={openRowData.pdf}/>
            </Modal.Body>
          </Modal>
        )}
      </>
    );
  };

  useEffect(() => {
    let forms, pdfs;

    const fetchData = async () => {
      try {
        // const formDataPromise = await axios.get("http://localhost:8080/HealthRecord/getallRecords", {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });

        // const pdfDataPromise = await axios.get(`http://localhost:8080/HealthRecord/getRecords/${patient.abhaNumber}`, {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });

        // const doctorPromise = await axios.get('http://localhost:8080/doctor/getMyDoctor', {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });

        // const [formDataResponse, pdfDataResponse, doctor] = await Promise.all([formDataPromise, pdfDataPromise, doctorPromise]);
        // forms = formDataResponse.data.filter(row => row.patientId === patient.id);
        // const pt = patientList.find(temp => (temp.id === patient.id));
        // forms = forms.map(record => ({
        //   ...record,
        //   patientName: pt.name,
        //   doctorName: doctor.data.name,
        // }));
        // pdfs = pdfDataResponse.data.map(record => {
        //   return {
        //     ...record,
        //     type: (record.type === "application/pdf") ? "PDF" : record.type,
        //     patientName: pt.name,
        //     doctorName: doctor.data.name,
        //   };
        // })

        // setData([...forms, ...pdfs]);
        const doctor = await axios.get('http://localhost:8080/doctor/getMyDoctor', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        const response = await axios.get(`http://localhost:8080/HealthRecord/getRecordsFromOtherHospital/${patient.abhaAddress}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const temp = response.data.map(record => ({
            ...record,
            patientName: patient.name,
            type: 'PDF',
            doctorName: doctor.data.name,
        }))
        setData(temp);
      } catch(error) {
        console.error('Fetching Medical Records Failed ', error.message);
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
        <HeaderCell>id</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column width={70}>
        <HeaderCell>patient</HeaderCell>
        <Cell dataKey="patientName" />
      </Column>

      <Column width={70}>
        <HeaderCell>doctor</HeaderCell>
        <Cell dataKey="doctorName" />
      </Column>

      <Column width={100}>
        <HeaderCell>type</HeaderCell>
        <Cell dataKey="type"/>
      </Column>

      <Column width={200}>
        <HeaderCell>expiry</HeaderCell>
        <Cell dataKey="expiry" />
      </Column>

      <Column width={200} fixed="right">
        <HeaderCell>Actions</HeaderCell>
        <Cell style={{ padding: '2px' }}>
          {rowData => (
            <>
              <ButtonToolbar>
                <Button onClick={() => handleOpen(rowData)}>Open</Button>
              </ButtonToolbar>
              {renderModal(rowData)}
            </>
          )}
        </Cell>
      </Column>

    </Table>
  );
};

export default FetchedMedicalRecords;
