import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '@/lib/axios';
import { setCredentials } from '@/features/auth/authSlice';
import { useToast } from '@/hooks/useToast';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        remember_me: false
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('auth/login/', formData);
            dispatch(setCredentials(response.data.user));
            toast({
                title: "Success",
                description: "Logged in successfully",
            });
            navigate('/dashboard');
        } catch (error) {
            toast({
                title: "Error",
                description: error.response?.data?.error || "Login failed",
                variant: "destructive",
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-white">
                    Username
                </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-white">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                />
            </div>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    name="remember_me"
                    id="remember_me"
                    checked={formData.remember_me}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-white">
                    Remember me
                </label>
            </div>
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
                Sign in
            </button>
        </form>
    );
};

export default LoginForm;