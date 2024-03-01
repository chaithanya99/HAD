// Login1.js
import React, { useState } from 'react';
import './Login2.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login2 = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem('token')
    }
    const checkAdmin = async (token) => {
        try {
          const response1 = await axios.get('http://localhost:8080/auth/admin', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response1.status === 200) {
            return 'admin';
          }
        } catch (error) {
          return 'user';
        }
    };
    const handleLogin = async () => {
        // Add your authentication logic here
        if (username === "" || password === "") {
          console.log("enter username and password");
          return;
        }
      
        try {
          const response = await axios.post("http://localhost:8080/auth/generateToken", {
            username,
            password
          });
      
          if (response.status === 200) {
            // Successful login, navigate to the dashboard
            localStorage.setItem('token', response.data);
            const token = localStorage.getItem('token');
            const role = await checkAdmin(token);
            if (role === 'admin') {
                console.log("Logged in as admin");
            } else if (role === 'user') {
                console.log("Logged in as user");
                navigate('/dashboard');
            } else {
                console.log("Error retrieving user role");
            }
             // Assuming you have a route for the dashboard
          } else {
            // Handle other status codes with a toast
            toast.error('Invalid username or password');
          }
        } catch (error) {
          console.error(error.message);
          toast.error('An error occurred during login');
        }
      
        console.log(`Logging in with username: ${username} and password: ${password}`);
      };

  return (
    <div className="login-page">
    <div className="login-container">
      <h2>Hospital Management System</h2>
      <form>
        <label>
            Username 
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
            Password   
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
    </div>
  );
};

export default Login2;
