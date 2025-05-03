import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { MainLayout } from '../components/layout/MainLayout';
import { Dashboard } from '../components/dashboard/Dashboard';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      
      {/* Protected routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </PrivateRoute>
        }
      />
      
      <Route
        path="/upload"
        element={
          <PrivateRoute>
            <MainLayout>
              <div>Upload page - Coming soon</div>
            </MainLayout>
          </PrivateRoute>
        }
      />
      
      <Route
        path="/shared"
        element={
          <PrivateRoute>
            <MainLayout>
              <div>Shared files - Coming soon</div>
            </MainLayout>
          </PrivateRoute>
        }
      />
      
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <MainLayout>
              <div>User profile - Coming soon</div>
            </MainLayout>
          </PrivateRoute>
        }
      />
      
      {/* Redirect any unknown routes to dashboard */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
