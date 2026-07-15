import React, { useEffect } from 'react';
import { useAppDispatch } from './app/hooks.js';
import { loadCurrentUser } from './features/auth/authSlice.js';
import { fetchCart } from './features/cart/cartSlice.js';
import AppRoutes from './routes/AppRoutes.jsx';
import ErrorBoundary from './components/errors/ErrorBoundary.jsx';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCurrentUser());
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  );
};

export default App;
