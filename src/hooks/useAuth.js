import { useAppSelector } from '../app/hooks.js';

const useAuth = () => {
  const { user, isAuthenticated, initializing } = useAppSelector((state) => state.auth);
  return { user, isAuthenticated, initializing, isAdmin: user?.role === 'admin' };
};

export default useAuth;
