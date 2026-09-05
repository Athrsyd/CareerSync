import { useState, useEffect } from 'react'
import API from '../services/api'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import CareerHooks from './CareerHooks'


const AuthHooks = () => {
    const { GetCareer } = CareerHooks();
    const navigate = useNavigate();

    // State Deklarasi Anjay
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [AuthLoading, setAuthLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);



    const handleRegister = async (e) => {
        setAuthLoading(true);
        e.preventDefault();
        try {
            const response = await API.post('/register', {
                username,
                email,
                password
            });
            console.log('Registration successful:', response.data);
            setMessage(response.data.message);
            const token = response.data.token;
            localStorage.setItem('tokenCareerSync', token);
            setUsername('');
            setEmail('');
            setPassword('');
            const userCareer = await GetCareer();
            console.log('User career data:', userCareer.length);

            setTimeout(() => {
                if (userCareer.length <= 0) {
                    navigate('/pretest');
                } else {
                    navigate('/dashboard');
                }
            }, 1500);
        } catch (error) {
            console.error('Error during registration:', error);
            setMessage(error.response?.data?.errors?.email?.[0]);
        }
        finally {
            setAuthLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'email') {
            setEmail(value);
        }
        else if (name === 'password') {
            setPassword(value);
        }
    }

    const handleLogin = async (e) => {
        setAuthLoading(true);
        e.preventDefault();
        try {
            const response = await API.post('/login', {
                email,
                password
            });
            console.log('Login successful:', response.data);
            setMessage(response.data.message);
            setEmail('');
            setPassword('');
            const token = response.data.token;
            localStorage.setItem('tokenCareerSync', token);

            const userCareer = await GetCareer();
            console.log('User career data:', userCareer.length);

            setTimeout(() => {
                if (userCareer.length <= 0) {
                    navigate('/pretest');
                } else {
                    navigate('/dashboard');
                }
            }, 1500);
        } catch (error) {
            console.error('Error during login:', error);
            setMessage(error.response?.data?.message || 'Login failed');
        } finally {
            setAuthLoading(false);
        }
    };

    const GetUser = async () => {
        setAuthLoading(true);
        const token = localStorage.getItem('tokenCareerSync');
        if (token) {
            try {
                const response = await API.get('/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                return response.data;
                // console.log('User data fetchecd successfully:', response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setAuthLoading(false);
            }
        }
    };

    const Logout = async () => {
        const confirmed = confirm('Apakah anda yakin ingin logout?');
        if (!confirmed) return;

        setAuthLoading(true);
        try {
            const token = localStorage.getItem('tokenCareerSync');
            const response = await API.post('/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert(response.data.message);
            localStorage.removeItem('tokenCareerSync');
            navigate('/auth');

        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            setAuthLoading(false);
        }
    }

    return {
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        AuthLoading,
        setAuthLoading,
        handleRegister,
        message,
        setMessage,
        handleChange,
        handleLogin,
        GetUser,
        Logout
    };
}

export default AuthHooks