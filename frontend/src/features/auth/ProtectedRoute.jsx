import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { user, isAuthenticated, isLoading } = useSelector(state => state.auth);
    const location = useLocation();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default ProtectedRoute;