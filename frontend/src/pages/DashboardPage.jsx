import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '@/components/layout/Layout';

const DashboardPage = () => {
    const { user } = useSelector(state => state.auth);

    return (
        <Layout>
            <div className="px-4 py-6 sm:px-0">
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <div className="mt-6">
                    <div className="bg-gray-800 shadow px-4 py-5 sm:rounded-lg sm:p-6">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <h3 className="text-lg font-medium text-white">Profile Information</h3>
                                <p className="mt-1 text-sm text-gray-400">
                                    Your personal information and role.
                                </p>
                            </div>
                            <div className="mt-5 md:mt-0 md:col-span-2">
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label className="block text-sm font-medium text-gray-400">Username</label>
                                        <p className="mt-1 text-sm text-white">{user.username}</p>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label className="block text-sm font-medium text-gray-400">Email</label>
                                        <p className="mt-1 text-sm text-white">{user.email}</p>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label className="block text-sm font-medium text-gray-400">Role</label>
                                        <p className="mt-1 text-sm text-white">{user.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DashboardPage;