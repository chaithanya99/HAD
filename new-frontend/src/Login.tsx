import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginImage from './images/login/doctoravatar.png';
import Sideimg from './images/login/Temp.png';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

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

            if (response.status === 200) 
            {
                const response2 = await axios.get("http://localhost:8080/auth/role", {
                headers: {
                    Authorization: `Bearer ${response.data}`
                }
                });
                // Successful login, navigate to the dashboard
                console.log(response2.data);
                localStorage.setItem('token', response.data);
                localStorage.setItem('role',response2.data)
                navigate('/dashboard'); 
                window.location.reload(); // Reload the entire application
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
            <img src={Sideimg} alt="Login" className="left-image" />

            <div className="login-container">
                <h2>Login</h2>
                <img src={loginImage} alt="Login" />
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

export default Login;
