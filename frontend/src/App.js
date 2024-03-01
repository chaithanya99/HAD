
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import DoctorLogin from './components/DoctorLogin';
import NurseLogin from './components/NurseLogin';
import Login1 from './components/Login1';
import Login2 from './components/Login2';
import Dashboard from './components/Dashboard';
import PatientRegistration from './components/PatientRegistration';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/nurse-login" element={<NurseLogin />} />
        <Route path="/login" element={<Login2/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/register-patient" element={<PatientRegistration/>}/>
      </Routes>
      <ToastContainer/>
    </Router>
  );
};

export default App;


