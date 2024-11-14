import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from '@/lib/axios';
import { setCredentials } from '@/features/auth/authSlice';
import { useToast } from '@/hooks/useToast';
import Layout from '@/components/layout/Layout';

const ProfilePage = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        mobile: user.mobile || '',
        address: user.address || '',
    });

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
            const response = await axios.put('auth/profile/update/', formData);
            dispatch(setCredentials(response.data));
            setIsEditing(false);
            toast({
                title: "Success",
                description: "Profile updated successfully",
            });
        } catch (error) {
            console.error('Update error:', error);
            toast({
                title: "Error",
                description: error.response?.data?.error ||
                    error.response?.data?.detail ||
                    "Failed to update profile",
                variant: "destructive",
            });
        }
    };

    return (
        <Layout>
            <div className="max-w-3xl mx-auto">
                <div className="bg-gray-800 shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg font-medium leading-6 text-white">Profile Information</h3>
                        <div className="mt-5">
                            {isEditing ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first_name" className="block text-sm font-medium text-gray-300">
                                                First name
                                            </label>
                                            <input
                                                type="text"
                                                name="first_name"
                                                id="first_name"
                                                value={formData.first_name}
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last_name" className="block text-sm font-medium text-gray-300">
                                                Last name
                                            </label>
                                            <input
                                                type="text"
                                                name="last_name"
                                                id="last_name"
                                                value={formData.last_name}
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm"
                                            />
                                        </div>

                                        <div className="col-span-6">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm"
                                            />
                                        </div>

                                        <div className="col-span-6">
                                            <label htmlFor="mobile" className="block text-sm font-medium text-gray-300">
                                                Mobile
                                            </label>
                                            <input
                                                type="tel"
                                                name="mobile"
                                                id="mobile"
                                                value={formData.mobile}
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm"
                                            />
                                        </div>

                                        <div className="col-span-6">
                                            <label htmlFor="address" className="block text-sm font-medium text-gray-300">
                                                Address
                                            </label>
                                            <textarea
                                                name="address"
                                                id="address"
                                                rows="3"
                                                value={formData.address}
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="px-4 py-2 border border-gray-600 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label className="block text-sm font-medium text-gray-400">First name</label>
                                            <p className="mt-1 text-sm text-white">{user.first_name || '-'}</p>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label className="block text-sm font-medium text-gray-400">Last name</label>
                                            <p className="mt-1 text-sm text-white">{user.last_name || '-'}</p>
                                        </div>

                                        <div className="col-span-6">
                                            <label className="block text-sm font-medium text-gray-400">Email</label>
                                            <p className="mt-1 text-sm text-white">{user.email}</p>
                                        </div>

                                        <div className="col-span-6">
                                            <label className="block text-sm font-medium text-gray-400">Mobile</label>
                                            <p className="mt-1 text-sm text-white">{user.mobile || '-'}</p>
                                        </div>

                                        <div className="col-span-6">
                                            <label className="block text-sm font-medium text-gray-400">Address</label>
                                            <p className="mt-1 text-sm text-white">{user.address || '-'}</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(true)}
                                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            Edit Profile
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProfilePage;