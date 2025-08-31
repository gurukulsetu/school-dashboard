import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/globals.css';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import Dashboard from './pages/Dashboard';
import PermissionDemo from './pages/PermissionDemo';
import NotFound from './pages/NotFound';
import NoInternet from './pages/NoInternet';

// Import route modules
import { studentRoutes } from './routes/studentRoutes';
import { feeRoutes } from './routes/feeRoutes';
import { staffRoutes } from './routes/staffRoutes';

// Placeholder components for other sections
const Students: React.FC = () => (
  <div className="p-4">
    <h2>Students Management</h2>
    <p>Student management features coming soon...</p>
  </div>
);

const Staff: React.FC = () => (
  <div className="p-4">
    <h2>Staff Management</h2>
    <p>Staff management features coming soon...</p>
  </div>
);

const Classes: React.FC = () => (
  <div className="p-4">
    <h2>Classes Management</h2>
    <p>Classes management features coming soon...</p>
  </div>
);

const Fees: React.FC = () => (
  <div className="p-4">
    <h2>Fee Management</h2>
    <p>Fee management features coming soon...</p>
  </div>
);

const Exams: React.FC = () => (
  <div className="p-4">
    <h2>Exam Management</h2>
    <p>Exam management features coming soon...</p>
  </div>
);

const Reports: React.FC = () => (
  <div className="p-4">
    <h2>Reports</h2>
    <p>Reports and analytics coming soon...</p>
  </div>
);

const Settings: React.FC = () => (
  <div className="p-4">
    <h2>Settings</h2>
    <p>System settings coming soon...</p>
  </div>
);

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Layout Component for authenticated routes
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  // Get active section from current route
  const getActiveSectionFromPath = (pathname: string): string => {
    const path = pathname.split('/')[1];
    return path || 'dashboard';
  };

  const activeSection = getActiveSectionFromPath(location.pathname);

  const handleSectionChange = (section: string) => {
    navigate(`/${section === 'dashboard' ? '' : section}`);
    closeSidebar();
  };

  return (
    <div className="app">
      <Sidebar 
        visible={sidebarVisible}
        onClose={closeSidebar}
      />
      <div className="main-wrapper">
        <Header 
          onToggleSidebar={toggleSidebar}
          sidebarVisible={sidebarVisible}
        />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

// Main App Component with routing
const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const isOnline = useOnlineStatus();
  const navigate = useNavigate();

  // Handle offline state
  if (!isOnline) {
    return <NoInternet onRetry={() => window.location.reload()} />;
  }

  const handleNavigateHome = () => {
    navigate('/');
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <Login />
        } 
      />
      
      {/* Protected Routes */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard" 
        element={<Navigate to="/" replace />} 
      />
      
      {/* Module Routes */}
      {studentRoutes}
      {feeRoutes}
      {staffRoutes}
      
      {/* Legacy Routes */}
      <Route 
        path="/students" 
        element={
          <ProtectedRoute>
            <Layout>
              <Students />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/staff" 
        element={
          <ProtectedRoute>
            <Layout>
              <Staff />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/classes" 
        element={
          <ProtectedRoute>
            <Layout>
              <Classes />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/fees" 
        element={
          <ProtectedRoute>
            <Layout>
              <Fees />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/exams" 
        element={
          <ProtectedRoute>
            <Layout>
              <Exams />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/reports" 
        element={
          <ProtectedRoute>
            <Layout>
              <Reports />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <Layout>
              <Settings />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/permissions" 
        element={
          <ProtectedRoute>
            <Layout>
              <PermissionDemo />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      {/* 404 Route - Must be last */}
      <Route 
        path="*" 
        element={<NotFound onNavigateHome={handleNavigateHome} />} 
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <PWAInstallPrompt />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
