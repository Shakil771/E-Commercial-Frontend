import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaHeart, FaBars, FaTimes, FaSignOutAlt, FaBoxOpen, FaTachometerAlt } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../app/hooks.js';
import useAuth from '../../hooks/useAuth.js';
import useOutsideClick from '../../hooks/useOutsideClick.js';
import { logout } from '../../features/auth/authSlice.js';
import { resetCartState } from '../../features/cart/cartSlice.js';
import { showSuccess } from '../common/Toast.jsx';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const cart = useAppSelector((state) => state.cart.cart);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useOutsideClick(menuRef, () => setUserMenuOpen(false));

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(searchTerm.trim() ? `/shop?search=${encodeURIComponent(searchTerm.trim())}` : '/shop');
    setMobileOpen(false);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    dispatch(resetCartState());
    showSuccess('Logged out successfully');
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="shrink-0 text-xl font-extrabold tracking-tight text-gray-900">
          MERN<span className="text-primary-600">Shop</span>
        </Link>

        <form onSubmit={handleSearch} className="hidden flex-1 max-w-xl md:block">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full border border-gray-300 py-2 pl-4 pr-10 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
              <FaSearch size={14} />
            </button>
          </div>
        </form>

        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-700 md:flex">
          <Link to="/shop" className="hover:text-gray-900">Shop</Link>
          {isAuthenticated && (
            <Link to="/wishlist" className="relative hover:text-gray-900">
              <FaHeart size={18} />
            </Link>
          )}
          <Link to="/cart" className="relative hover:text-gray-900">
            <FaShoppingCart size={19} />
            {cart.totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">
                {cart.totalItems > 9 ? '9+' : cart.totalItems}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full hover:text-gray-900"
              >
                {user?.avatar?.url ? (
                  <img src={user.avatar.url} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                )}
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl border border-gray-200 bg-white py-2 shadow-lg">
                  <p className="truncate px-4 py-1.5 text-xs text-gray-400">{user?.email}</p>
                  <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <FaUser size={13} /> Profile
                  </Link>
                  <Link to="/orders" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <FaBoxOpen size={13} /> My Orders
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <FaTachometerAlt size={13} /> Admin Dashboard
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    <FaSignOutAlt size={13} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn-primary !px-4 !py-2">
              Sign In
            </Link>
          )}
        </nav>

        <button type="button" className="text-gray-700 md:hidden" onClick={() => setMobileOpen((prev) => !prev)}>
          {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-4 md:hidden">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-full border border-gray-300 py-2 pl-4 pr-10 text-sm focus:outline-none"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FaSearch size={14} />
              </button>
            </div>
          </form>
          <div className="flex flex-col gap-3 text-sm font-medium text-gray-700">
            <Link to="/shop" onClick={() => setMobileOpen(false)}>Shop</Link>
            <Link to="/cart" onClick={() => setMobileOpen(false)}>Cart ({cart.totalItems || 0})</Link>
            {isAuthenticated ? (
              <>
                <Link to="/wishlist" onClick={() => setMobileOpen(false)}>Wishlist</Link>
                <Link to="/profile" onClick={() => setMobileOpen(false)}>Profile</Link>
                <Link to="/orders" onClick={() => setMobileOpen(false)}>My Orders</Link>
                {isAdmin && <Link to="/admin" onClick={() => setMobileOpen(false)}>Admin Dashboard</Link>}
                <button type="button" onClick={handleLogout} className="text-left text-red-600">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)}>Sign In</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
