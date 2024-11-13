import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from '@/lib/axios';
import { clearCredentials } from '@/features/auth/authSlice';
import { useToast } from '@/hooks/useToast';

const Navbar = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogout = async () => {
        try {
            await axios.post('auth/logout/');
            dispatch(clearCredentials());
            toast({
                title: "Success",
                description: "Logged out successfully",
            });
            navigate('/login');
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to logout",
                variant: "destructive",
            });
        }
    };

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/dashboard" className="text-white font-bold text-xl">
                            Dashboard
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {user?.role === 'SUPERADMIN' && (
                                    <Link
                                        to="/admin"
                                        className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Admin Panel
                                    </Link>
                                )}
                                <Link
                                    to="/profile"
                                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;