import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AuthLayout = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-gray-900">
          MERN<span className="text-primary-600">Shop</span>
        </Link>
      </div>
      <div className="card p-8">
        <Outlet />
      </div>
    </div>
  </div>
);

export default AuthLayout;
