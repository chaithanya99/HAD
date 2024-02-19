// src/components/Login.js
import React, { useState } from 'react';
import './Login.css'; // Import the stylesheet for the Login component
import axios from 'axios';
const Login1 = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogout=()=>{
    localStorage.removeItem('token')
  }
  const handleTesting=async ()=>{
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get('http://localhost:8080/auth/admin',{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
  }

  const handleLogin =async () => {
    // Add your authentication logic here
    if(username==="" || password===""){
        console.log("enter username and password");
        return ;
    }

    try {
        
        const u=await axios.post("http://localhost:8080/auth/generateToken",{
            username,
            password
        })
        console.log(u.data);
        localStorage.setItem('token',u.data)
    } catch (error) {
        console.log(error.message)
    }
    console.log(`Logging with username: ${username} and password: ${password}`);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{`Login`}</h2>
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
          <button type="button" onClick={handleTesting}>
            Test
          </button>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login1;
