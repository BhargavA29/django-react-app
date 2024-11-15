import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '@/lib/axios';
import { useToast } from '@/hooks/useToast';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        mobile: '',
        address: ''
    });
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('auth/register/', formData);
            toast({
                title: "Success",
                description: "Registration successful! Please login.",
            });
            navigate('/login');
        } catch (error) {
            toast({
                title: "Error",
                description: error.response?.data?.error || "Registration failed",
                variant: "destructive",
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="username" className="block text-sm text-white font-medium">
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
                    <label htmlFor="email" className="block text-sm font-medium text-white">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </div>
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
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="first_name" className="block text-sm font-medium text-white">
                        First Name
                    </label>
                    <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor="last_name" className="block text-sm font-medium text-white">
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-white">
                    Mobile (optional)
                </label>
                <input
                    type="tel"
                    name="mobile"
                    id="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>
            <div>
                <label htmlFor="address" className="block text-sm font-medium text-white">
                    Address (optional)
                </label>
                <textarea
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
                Register
            </button>
        </form>
    );
};

export default RegisterForm;