import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import Layout from '../components/common/Layout';

// Placeholder components for staff routes
const StaffList: React.FC = () => (
  <div className="p-4">
    <h2>Staff List</h2>
    <p>Staff list coming soon...</p>
  </div>
);

const AddStaff: React.FC = () => (
  <div className="p-4">
    <h2>Add Staff</h2>
    <p>Add staff form coming soon...</p>
  </div>
);

export const staffRoutes = [
  <Route 
    key="/staff/list"
    path="/staff/list" 
    element={
      <ProtectedRoute requiredScope="view_staff">
        <Layout>
          <StaffList />
        </Layout>
      </ProtectedRoute>
    } 
  />,
  <Route 
    key="/staff/add"
    path="/staff/add" 
    element={
      <ProtectedRoute requiredScope="add_staff">
        <Layout>
          <AddStaff />
        </Layout>
      </ProtectedRoute>
    } 
  />,
];
