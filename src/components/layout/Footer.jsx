import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => (
  <footer className="mt-20 border-t border-gray-200 bg-white">
    <div className="container-page grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
      <div className="col-span-2 md:col-span-1">
        <h3 className="text-lg font-extrabold text-gray-900">
          MERN<span className="text-primary-600">Shop</span>
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Quality products, delivered fast. Your one-stop shop for electronics, fashion, home goods and more.
        </p>
        <div className="mt-4 flex gap-3 text-gray-400">
          <FaFacebook size={18} className="hover:text-gray-700" />
          <FaTwitter size={18} className="hover:text-gray-700" />
          <FaInstagram size={18} className="hover:text-gray-700" />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-900">Shop</h4>
        <ul className="mt-3 space-y-2 text-sm text-gray-500">
          <li><Link to="/shop" className="hover:text-gray-900">All Products</Link></li>
          <li><Link to="/shop?featured=true" className="hover:text-gray-900">Featured</Link></li>
          <li><Link to="/shop?sort=newest" className="hover:text-gray-900">New Arrivals</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-900">Account</h4>
        <ul className="mt-3 space-y-2 text-sm text-gray-500">
          <li><Link to="/profile" className="hover:text-gray-900">My Profile</Link></li>
          <li><Link to="/orders" className="hover:text-gray-900">Order History</Link></li>
          <li><Link to="/wishlist" className="hover:text-gray-900">Wishlist</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-900">Support</h4>
        <ul className="mt-3 space-y-2 text-sm text-gray-500">
          <li>help@mernshop.com</li>
          <li>Mon-Fri, 9am-6pm</li>
        </ul>
      </div>
    </div>

    <div className="border-t border-gray-100 py-4 text-center text-xs text-gray-400">
      &copy; {new Date().getFullYear()} MERNShop. All rights reserved.
    </div>
  </footer>
);

export default Footer;
