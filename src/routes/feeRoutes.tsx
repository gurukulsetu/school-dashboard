import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import Layout from '../components/common/Layout';
import PayFee from '../pages/fees/PayFee';
import ManageFee from '../pages/fees/ManageFee';
import ConfigureFee from '../pages/fees/ConfigureFee';

export const feeRoutes = [
  <Route 
    key="/fees/pay"
    path="/fees/pay" 
    element={
      <ProtectedRoute requiredScope="pay_fee">
        <Layout>
          <PayFee />
        </Layout>
      </ProtectedRoute>
    } 
  />,
  <Route 
    key="/fees/manage"
    path="/fees/manage" 
    element={
      <ProtectedRoute requiredScope="manage_fee">
        <Layout>
          <ManageFee />
        </Layout>
      </ProtectedRoute>
    } 
  />,
  <Route 
    key="/fees/configure"
    path="/fees/configure" 
    element={
      <ProtectedRoute requiredScope="configure_fee">
        <Layout>
          <ConfigureFee />
        </Layout>
      </ProtectedRoute>
    } 
  />,
];
