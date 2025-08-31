export {};
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import PermissionDemo from '../pages/PermissionDemo';
import ProtectedRoute from '../components/common/ProtectedRoute';
import PayFee from '../pages/fees/PayFee';
import ManageFee from '../pages/fees/ManageFee';
import ConfigureFee from '../pages/fees/ConfigureFee';

const routeConfig = [
  {
    path: '/',
  element: <Dashboard />,
    requiredScope: '',
  },
  {
    path: '/fees/pay',
    element: <PayFee />,
    requiredScope: 'pay_fee',
  },
  {
    path: '/fees/manage',
    element: <ManageFee />,
    requiredScope: 'manage_fee',
  },
  {
    path: '/fees/configure',
    element: <ConfigureFee />,
    requiredScope: 'configure_fee',
  },
];

const AppRoutes: React.FC = () => (
  <Routes>
    {routeConfig.map(({ path, element, requiredScope }) =>
      requiredScope ? (
        <Route
          key={path}
          path={path}
          element={<ProtectedRoute requiredScope={requiredScope}>{element}</ProtectedRoute>}
        />
      ) : (
        <Route key={path} path={path} element={element} />
      )
    )}
    <Route path="/permission-demo" element={<PermissionDemo />} />
    <Route path="*" element={<PermissionDemo />} />
  </Routes>
);

export default AppRoutes;
