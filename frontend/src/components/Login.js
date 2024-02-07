// src/components/Login.js
import React, { useState } from 'react';
import './Login.css'; // Import the stylesheet for the Login component

const Login = ({ userType }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your authentication logic here
    console.log(`Logging in as ${userType} with username: ${username} and password: ${password}`);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{`Login as ${userType}`}</h2>
        <form>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
