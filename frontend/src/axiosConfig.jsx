import axios from 'axios';
const address = import.meta.env.VITE_APP_ADDRESS;
const port = import.meta.env.VITE_APP_PORT;
const fullUrl = `${address}:${port}`;

const api = axios.create({
    baseURL: fullUrl,
    withCredentials: true, 
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;
