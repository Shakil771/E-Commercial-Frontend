import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from '../components/layout/MainLayout.jsx';
import AuthLayout from '../components/layout/AuthLayout.jsx';
import AdminLayout from '../components/layout/AdminLayout.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import AdminRoute from './AdminRoute.jsx';
import PublicRoute from './PublicRoute.jsx';
import NotFound from '../components/errors/NotFound.jsx';

import HomePage from '../features/home/HomePage.jsx';
import ProductListPage from '../features/products/pages/ProductListPage.jsx';
import ProductDetailsPage from '../features/products/pages/ProductDetailsPage.jsx';
import CartPage from '../features/cart/pages/CartPage.jsx';
import CheckoutPage from '../features/checkout/pages/CheckoutPage.jsx';
import WishlistPage from '../features/wishlist/pages/WishlistPage.jsx';
import OrderListPage from '../features/orders/pages/OrderListPage.jsx';
import OrderDetailsPage from '../features/orders/pages/OrderDetailsPage.jsx';
import ProfilePage from '../features/user/pages/ProfilePage.jsx';
import AddressBookPage from '../features/user/pages/AddressBookPage.jsx';

import LoginPage from '../features/auth/pages/LoginPage.jsx';
import RegisterPage from '../features/auth/pages/RegisterPage.jsx';
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage.jsx';
import ResetPasswordPage from '../features/auth/pages/ResetPasswordPage.jsx';

import DashboardPage from '../features/admin/dashboard/pages/DashboardPage.jsx';
import ProductManagePage from '../features/admin/products/pages/ProductManagePage.jsx';
import ProductEditPage from '../features/admin/products/pages/ProductEditPage.jsx';
import CategoryManagePage from '../features/admin/categories/pages/CategoryManagePage.jsx';
import OrderManagePage from '../features/admin/orders/pages/OrderManagePage.jsx';
import AdminOrderDetailsPage from '../features/admin/orders/pages/AdminOrderDetailsPage.jsx';
import UserManagePage from '../features/admin/users/pages/UserManagePage.jsx';
import CouponManagePage from '../features/admin/coupons/pages/CouponManagePage.jsx';
import ReviewManagePage from '../features/admin/reviews/pages/ReviewManagePage.jsx';
import VerifyEmailPage from '../features/auth/pages/VerifyEmailPage.jsx';

const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ProductListPage />} />
      <Route path="/product/:idOrSlug" element={<ProductDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/orders" element={<OrderListPage />} />
        <Route path="/orders/:id" element={<OrderDetailsPage />} />
        <Route path="/profile" element={<ProfilePage />}>
          <Route path="addresses" element={<AddressBookPage />} />
        </Route>
      </Route>
    </Route>

    <Route element={<AuthLayout />}>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
    </Route>

    <Route element={<AdminRoute />}>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="products" element={<ProductManagePage />} />
        <Route path="products/new" element={<ProductEditPage />} />
        <Route path="products/:id/edit" element={<ProductEditPage />} />
        <Route path="categories" element={<CategoryManagePage />} />
        <Route path="orders" element={<OrderManagePage />} />
        <Route path="orders/:id" element={<AdminOrderDetailsPage />} />
        <Route path="users" element={<UserManagePage />} />
        <Route path="coupons" element={<CouponManagePage />} />
        <Route path="reviews" element={<ReviewManagePage />} />
      </Route>
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
