import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import api from './axiosConfig';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await api.get(`/api/check-auth`, { withCredentials: true });
                console.log('User Authenticated:', response.data.authenticated); 
                setIsAuthenticated(response.data.authenticated);
            } catch (error) {
                console.error('Error checking authentication:', error);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuthentication();
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isAuthenticated) {
        return <Component {...rest} />;
    } else {
        console.log('Not logged in');
        return <Navigate to="/login" />;
    }
};