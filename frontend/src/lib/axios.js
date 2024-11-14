import axios from 'axios';
import { store } from '@/app/store';
import { logout } from '@/features/auth/authSlice';

const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
        ? 'http://3.109.206.96/api/'  // Production API URL
        : 'http://localhost:8000/api/', // Development API URL
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            store.dispatch(logout());
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;