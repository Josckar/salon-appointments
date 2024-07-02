import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import api from './axiosConfig';
export const AdminRoute = ({ component: Component, ...rest }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const response = await api.get(`/api/check-admin`, { withCredentials: true });
                setIsAdmin(response.data.admin);
            } catch (error) {
                console.error('Error checking admin status:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAdmin();
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }
    
    if (isAdmin) {
        return <Component {...rest} />;
    } else {
        console.log('User is not');
        return <Navigate to="/appointment" />;
    }
};
