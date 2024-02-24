// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// src/App.js
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login1 from './components/Login1';
import Dashboard from './components/Dashboard';
import PatientRegistration from './components/nurse_components/PatientRegistration';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login1/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/register-patient" element={<PatientRegistration/>}/>
      </Routes>
    </Router>
  );
};

export default App;


