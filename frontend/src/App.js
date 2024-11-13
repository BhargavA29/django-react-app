import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Toaster } from "@/components/ui/toaster";
import axios from '@/lib/axios';
import { setCredentials, clearCredentials } from '@/features/auth/authSlice';

// Pages
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import ProfilePage from '@/pages/ProfilePage';
import ProtectedRoute from '@/features/auth/ProtectedRoute';
import AdminPage from '@/pages/AdminPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('auth/profile/');
        dispatch(setCredentials(response.data));
      } catch (error) {
        dispatch(clearCredentials());
      }
    };

    checkAuth();
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['SUPERADMIN']}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;