import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
    <p className="text-7xl font-extrabold text-gray-900">404</p>
    <h1 className="mt-4 text-2xl font-bold text-gray-900">Page not found</h1>
    <p className="mt-2 max-w-md text-gray-500">
      The page you are looking for doesn&apos;t exist or has been moved.
    </p>
    <Link to="/" className="btn-primary mt-8">
      Back to Home
    </Link>
  </div>
);

export default NotFound;
