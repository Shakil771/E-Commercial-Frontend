import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaListAlt,
  FaClipboardList,
  FaUsers,
  FaStar,
  FaTag,
  FaArrowLeft,
} from 'react-icons/fa';

const links = [
  { to: '/admin', label: 'Dashboard', icon: FaTachometerAlt, end: true },
  { to: '/admin/products', label: 'Products', icon: FaBoxOpen },
  { to: '/admin/categories', label: 'Categories', icon: FaListAlt },
  { to: '/admin/orders', label: 'Orders', icon: FaClipboardList },
  { to: '/admin/users', label: 'Users', icon: FaUsers },
  { to: '/admin/coupons', label: 'Coupons', icon: FaTag },
  { to: '/admin/reviews', label: 'Reviews', icon: FaStar },
];

const Sidebar = () => (
  <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white md:block">
    <div className="flex h-16 items-center border-b border-gray-200 px-6">
      <span className="text-lg font-extrabold text-gray-900">
        MERN<span className="text-primary-600">Admin</span>
      </span>
    </div>
    <nav className="flex flex-col gap-1 p-4">
      {links.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <Icon size={16} />
          {label}
        </NavLink>
      ))}
    </nav>
    <div className="mt-auto p-4">
      <NavLink to="/" className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100">
        <FaArrowLeft size={14} /> Back to Store
      </NavLink>
    </div>
  </aside>
);

export default Sidebar;
