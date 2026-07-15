import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import productReducer from '../features/products/productSlice.js';
import cartReducer from '../features/cart/cartSlice.js';
import orderReducer from '../features/orders/orderSlice.js';
import wishlistReducer from '../features/wishlist/wishlistSlice.js';
import userReducer from '../features/user/userSlice.js';
import categoryReducer from '../features/admin/categories/categorySlice.js';
import dashboardReducer from '../features/admin/dashboard/dashboardSlice.js';
import adminProductReducer from '../features/admin/products/adminProductSlice.js';
import adminOrderReducer from '../features/admin/orders/adminOrderSlice.js';
import adminUserReducer from '../features/admin/users/adminUserSlice.js';
import couponReducer from '../features/admin/coupons/couponSlice.js';
import reviewReducer from '../features/reviews/reviewSlice.js';
import checkoutReducer from '../features/checkout/checkoutSlice.js';
import adminReviewReducer from '../features/admin/reviews/adminReviewSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
    wishlist: wishlistReducer,
    user: userReducer,
    categories: categoryReducer,
    dashboard: dashboardReducer,
    adminProducts: adminProductReducer,
    adminOrders: adminOrderReducer,
    adminUsers: adminUserReducer,
    coupons: couponReducer,
    reviews: reviewReducer,
    checkout: checkoutReducer,
    adminReviews: adminReviewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
