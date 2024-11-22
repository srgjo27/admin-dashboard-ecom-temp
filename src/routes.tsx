import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Layout from './pages/Layout';
import DashboardPage from './pages/dashboard/DashboardPage';
import ManagementUserPage from './pages/user/ManagementUserPage';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/signin" element={<LoginPage />} />
                    <Route path="/signup" element={<RegisterPage />} />
                    <Route 
                        path="/admin/dashboard" 
                        element={<ProtectedRoute><Layout children={<DashboardPage />} /></ProtectedRoute>} 
                    />
                    <Route 
                        path="/admin/management-user" 
                        element={<ProtectedRoute><Layout children={<ManagementUserPage />} /></ProtectedRoute>} 
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default AppRoutes;