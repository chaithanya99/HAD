import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginImage from '../../img/doctoravatar.png';
import Sideimg from '../../img/Temp.png';


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

            if (response.status === 200) {
                // Successful login, navigate to the dashboard
                localStorage.setItem('token', response.data);
                navigate('/adminDashboard'); // Assuming you have a route for the dashboard
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
