import React from 'react';
import Cookies from 'js-cookie';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
  const ACCESS_TOKEN = Cookies.get('access_token');
  return ACCESS_TOKEN ? <Outlet /> : <Navigate to="/login" />;
}
