import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from '@/lib/axios';
import { useToast } from '@/hooks/useToast';
import Layout from '@/components/layout/Layout';

const AdminPage = () => {
    const { user } = useSelector(state => state.auth);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchUsers = useCallback(async () => {
        try {
            const response = await axios.get('auth/users/');
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch users",
                variant: "destructive",
            });
            setLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleRoleChange = async (userId, newRole) => {
        try {
            await axios.patch(`auth/users/${userId}/role/`, { role: newRole });
            fetchUsers(); // Refresh the users list
            toast({
                title: "Success",
                description: "User role updated successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update user role",
                variant: "destructive",
            });
        }
    };

    const handleToggleActive = async (userId, currentStatus) => {
        try {
            await axios.patch(`auth/users/${userId}/toggle-active/`, {
                is_active: !currentStatus
            });
            fetchUsers(); // Refresh the users list
            toast({
                title: "Success",
                description: "User status updated successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update user status",
                variant: "destructive",
            });
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-screen">
                    <div className="text-white">Loading...</div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="px-4 py-6 sm:px-0">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white">User Management</h1>
                </div>

                <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {users.map((u) => (
                                    <tr key={u.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div>
                                                    <div className="text-sm font-medium text-white">
                                                        {u.username}
                                                    </div>
                                                    <div className="text-sm text-gray-400">
                                                        {u.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select
                                                value={u.role}
                                                onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                                disabled={u.id === user.id}
                                                className="bg-gray-700 text-white rounded-md px-2 py-1 text-sm"
                                            >
                                                <option value="USER">Regular User</option>
                                                <option value="CONTENT_CREATOR">Content Creator</option>
                                                <option value="DEVELOPER">Developer</option>
                                                <option value="SUPERADMIN">Super Admin</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${u.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {u.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                            {u.id !== user.id && u.role !== 'SUPERADMIN' && (
                                                <button
                                                    onClick={() => handleToggleActive(u.id, u.is_active)}
                                                    className={`px-3 py-1 rounded-md text-sm font-medium ${u.is_active ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                                                        } text-white`}
                                                >
                                                    {u.is_active ? 'Deactivate' : 'Activate'}
                                                </button>
                                            )}
                                            {u.role === 'SUPERADMIN' && (
                                                <span className="text-gray-500 italic">
                                                    Cannot deactivate SUPERADMIN
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminPage; 