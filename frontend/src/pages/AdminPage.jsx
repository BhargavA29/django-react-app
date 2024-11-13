import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '@/lib/axios';
import Layout from '@/components/layout/Layout';
import { useToast } from "@/components/ui/use-toast";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user: currentUser } = useSelector(state => state.auth);
    const { toast } = useToast();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('auth/users/');
            setUsers(response.data);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch users",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await axios.patch(`auth/users/${userId}/role/`, { role: newRole });
            fetchUsers();
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
            fetchUsers();
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
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="px-4 py-6 sm:px-0">
                <h1 className="text-3xl font-bold text-white mb-6">Admin Panel</h1>
                <div className="bg-gray-800 shadow rounded-lg p-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Username</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Select
                                            value={user.role}
                                            onValueChange={(value) => handleRoleChange(user.id, value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue>{user.role}</SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="SUPERADMIN">Super Admin</SelectItem>
                                                <SelectItem value="DEVELOPER">Developer</SelectItem>
                                                <SelectItem value="CONTENT_CREATOR">Content Creator</SelectItem>
                                                <SelectItem value="USER">User</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs ${user.is_active ? 'bg-green-500' : 'bg-red-500'}`}>
                                            {user.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant={user.is_active ? "destructive" : "default"}
                                            onClick={() => handleToggleActive(user.id, user.is_active)}
                                        >
                                            {user.is_active ? 'Deactivate' : 'Activate'}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </Layout>
    );
};

export default AdminPage; 