import React, { useEffect, useState } from 'react';
import { DOMHelper, Table, Button, ButtonToolbar, Tooltip, IconButton, Modal, Loader, Placeholder, Divider } from 'rsuite'; // Import Button from rsuite
import { mockUsers } from '@/data/mock';
import axios from 'axios';
import { FaEdit, FaEye } from 'react-icons/fa';
import { GrDocumentUpload } from 'react-icons/gr';
import { LuClock } from 'react-icons/lu';
import { useLocation } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

const VirtualizedTable5 = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const location = useLocation();

  const initialPatient = location.state ? location.state.patient : null;
  console.log(initialPatient);

  const [patient, setPatient] = useState(initialPatient);
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
    // const fetchFormData = async () => {
    //   try {
    //     const response = await axios.get("http://localhost:8080/HealthRecord/getallRecords", {
    //       headers: {
    //         'Authorization': `Bearer ${token}`
    //       }
    //     });
    //     forms = response.data;
    //     console.log(forms);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };

    // const fetchPdfData = async () => {
    //   try {
    //     const response = await axios.get(`http://localhost:8080/HealthRecord/getRecords/${patient.abhaNumber}`, {
    //       headers: {
    //         'Authorization': `Bearer ${token}`
    //       }
    //     });
    //     pdfs = response.data.map(record => {
    //       return {
    //         ...record,
    //         type: (record.type == "application/pdf") ? "PDF" : record.type
    //       }
    //     });
    //     console.log(pdfs);
    //   } catch(error) {
    //     console.error("Error Fetching PDFs records: ", error.message);
    //   }
    // };

    // fetchFormData();
    // fetchPdfData();
    // console.log(forms);
    // console.log(pdfs);
    // setData([...forms, ...pdfs]);

    const fetchData = async () => {
      try {
        const formDataPromise = await axios.get("http://localhost:8080/HealthRecord/getallRecords", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const pdfDataPromise = await axios.get(`http://localhost:8080/HealthRecord/getRecords/${patient.abhaNumber}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const [formDataResponse, pdfDataResponse] = await Promise.all([formDataPromise, pdfDataPromise]);
        forms = formDataResponse.data;
        pdfs = pdfDataResponse.data.map(record => {
          return {
            ...record,
            type: (record.type === "application/pdf") ? "PDF" : record.type
          };
        })

        setData([...forms, ...pdfs]);
      } catch(error) {
        
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
        <HeaderCell>patientId</HeaderCell>
        <Cell dataKey="patientId" />
      </Column>

      <Column width={70}>
        <HeaderCell>doctorId</HeaderCell>
        <Cell dataKey="doctorId" />
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

export default VirtualizedTable5;
