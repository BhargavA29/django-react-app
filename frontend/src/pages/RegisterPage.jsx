import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '@/features/auth/RegisterForm';

const RegisterPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
                            Sign in
                        </Link>
                    </p>
                </div>
                <RegisterForm />
            </div>
        </div>
    );
};

export default RegisterPage;