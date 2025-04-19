import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import SellerDashboard from '../pages/Dashboard/SellerDashboard';
import BuyerDashboard from '../pages/Dashboard/BuyerDashboard';
import ProtectedRoute from '../components/Common/ProtectedRoute';
import NotFound from '../pages/NotFound';
import DealDetails from '../components/deal/DealDetails';
import DealList from '../pages/Deals/DealList';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/seller/dashboard"
        element={
          <ProtectedRoute allowedRoles={['Seller']}>
            <SellerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/buyer/dashboard"
        element={
          <ProtectedRoute allowedRoles={['Buyer']}>
            <BuyerDashboard />
          </ProtectedRoute>
        }
      />
   <Route path="/deals/:id" element={<DealDetails />} />
   <Route path='/deals'element={<DealList/>}/>
      <Route path="*" element={<NotFound />} />
      
    </Routes>
  );
};

export default AppRoutes;
