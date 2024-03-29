
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Login1 from './components/Login1';
// import Login2 from './components/Login2';
import Dashboard from './components/Dashboard';
// import PatientRegistration from './components/nurse_components/PatientRegistration';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login_Dashboard/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        {/* <Route path="/register-patient" element={<PatientRegistration/>}/> */}
      </Routes>
      <ToastContainer/>
    </Router>
  );
};

export default App;


