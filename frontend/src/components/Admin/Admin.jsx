import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Users from './Users/Users';
import Appointments from './Appointments/Appointments';
import api from '../../axiosConfig'; // Ensure this import path is correct

const Dashboard = () => {
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        api.get('/api/get-users')
            .then(response => {
                setUserCount(response.data.users.length);
            })
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/admin/users">Users</Link></li>
                    <li><Link to="/admin/appointments">Appointments</Link></li>
                </ul>
            </nav>
            <div>User Count: {userCount}</div>
        </div>
    );
};

const Admin = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/appointments" element={<Appointments />} />
        </Routes>
    );
};

export default Admin;