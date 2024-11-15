import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

const UnauthorizedPage = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-900 px-4">
                <div className="text-center space-y-6 max-w-xl">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold text-white">
                            Access Denied
                        </h1>
                        <div className="text-6xl my-4">
                            🚫
                        </div>
                        <p className="text-gray-400 text-lg">
                            Sorry, you don't have permission to access this page. Please contact your administrator if you believe this is a mistake.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                        <button
                            onClick={() => navigate(-1)}
                            className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                        >
                            Go Back
                        </button>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UnauthorizedPage;