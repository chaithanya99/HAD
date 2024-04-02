
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Login1 from './components/Login1';
// import Login2 from './components/Login2';
import Dashboard from './components/Dashboard';
import ID_Register from './components/ABHAID_Registration/ID_Register/ID_Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login_Dashboard/Login';
import DoctorAdd from './Admin_pages/Doctor_add';
import NurseDashboard from './Nurse_pages/NurseDashboard';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/adddoc" element={<DoctorAdd/>}/>
        <Route path="/RP" element={<ID_Register/>}/>
        <Route path="/logout" element={<Navigate to="/login" />} />
        <Route path="/nurseDashboard" element={<NurseDashboard/>}/>

      </Routes>
      <ToastContainer/>
    </Router>
  );
};

export default App;


