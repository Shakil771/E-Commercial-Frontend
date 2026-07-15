import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import Sidebar from './Sidebar.jsx';

const AdminLayout = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:hidden">
          <span className="text-lg font-extrabold text-gray-900">
            MERN<span className="text-primary-600">Admin</span>
          </span>
          <button type="button" onClick={() => setMobileNavOpen((prev) => !prev)}>
            <FaBars size={20} />
          </button>
        </header>
        {mobileNavOpen && (
          <div className="border-b border-gray-200 bg-white p-4 md:hidden">
            <Sidebar />
          </div>
        )}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
