import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.js';
import { login, clearAuthError } from '../authSlice.js';
import Input from '../../../components/common/Input.jsx';
import Button from '../../../components/common/Button.jsx';
import { showError, showSuccess } from '../../../components/common/Toast.jsx';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const { status } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    dispatch(clearAuthError());
    const result = await dispatch(login(formData));
    if (login.fulfilled.match(result)) {
      showSuccess('Welcome back!');
      const redirectTo = location.state?.from?.pathname || '/';
      navigate(redirectTo, { replace: true });
    } else {
      showError(result.payload || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
        <p className="mt-1 text-sm text-gray-500">Sign in to your account to continue</p>
      </div>

      <Input
        label="Email address"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register('email', { required: 'Email is required' })}
      />
      <div className='relative'>
        <Input
          className="w-full py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" // Add padding for the eye icon
          type={showPassword ? "text" : "password"} // Toggle type based on showPassword state
          label="Password"
          placeholder="Enter your password..."
          error={errors.password?.message}
          {...register('password', { required: 'Password is required' })}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:font-bold pt-6"
          aria-label={showPassword ? "Hide password" : "Show password"
          }          >
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>

      </div>


      <div className="flex justify-end">
        <Link to="/forgot-password" className="text-sm font-medium text-gray-600 hover:text-gray-900">
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="w-full" isLoading={status === 'loading'}>
        Sign In
      </Button>

      <p className="text-center text-sm text-gray-500">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-semibold text-gray-900 hover:underline">
          Create one
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
