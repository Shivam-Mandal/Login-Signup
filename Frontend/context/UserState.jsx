import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserContext from './UserContext';

const UserState = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const register = async (userData) => {
        try {
            const response = await axios.post('http://localhost:3000/api/user/register', userData);
            if (response.data.success) {
                setToken(response.data.token);
                return response.data;
            } else {
                return { success: false, error: response.data.error };
            }
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const login = async (userData) => {
        try {
            const response = await axios.post('http://localhost:3000/api/user/login', userData);
            if (response.data.success) {
                setToken(response.data.token);
                return response.data;
            } else {
                return { success: false, error: response.data.error };
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };
    
    const isAuthenticated = () => {
        return !!token;
    };

    return (
        <UserContext.Provider value={{ token, register, login, logout, isAuthenticated, setToken }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserState;
