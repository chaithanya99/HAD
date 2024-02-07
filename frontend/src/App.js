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
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DoctorLogin from './components/DoctorLogin';
import NurseLogin from './components/NurseLogin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/nurse-login" element={<NurseLogin />} />
      </Routes>
    </Router>
  );
};

export default App;


