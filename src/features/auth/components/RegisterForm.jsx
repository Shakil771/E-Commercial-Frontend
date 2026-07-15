import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.js';
import { register as registerUser, clearAuthError } from '../authSlice.js';
import Input from '../../../components/common/Input.jsx';
import Button from '../../../components/common/Button.jsx';
import { showError, showSuccess } from '../../../components/common/Toast.jsx';

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = async (formData) => {
    dispatch(clearAuthError());
    const { confirmPassword, ...payload } = formData;
    const result = await dispatch(registerUser(payload));
    if (registerUser.fulfilled.match(result)) {
      showSuccess('Account created successfully!');
      navigate('/', { replace: true });
    } else {
      showError(result.payload || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
        <p className="mt-1 text-sm text-gray-500">Join us and start shopping today</p>
      </div>

      <Input
        label="Full name"
        placeholder="John Doe"
        error={errors.name?.message}
        {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name is too short' } })}
      />

      <Input
        label="Email address"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register('email', {
          required: 'Email is required',
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
        })}
      />

      <Input
        label="Password"
        type="password"
        placeholder="At least 8 characters"
        error={errors.password?.message}
        {...register('password', {
          required: 'Password is required',
          minLength: { value: 8, message: 'Password must be at least 8 characters' },
          pattern: { value: /^(?=.*[a-zA-Z])(?=.*\d).+$/, message: 'Include at least one letter and one number' },
        })}
      />

      <Input
        label="Confirm password"
        type="password"
        placeholder="Re-enter your password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword', {
          required: 'Please confirm your password',
          validate: (value) => value === password || 'Passwords do not match',
        })}
      />

      <Button type="submit" className="w-full" isLoading={status === 'loading'}>
        Create Account
      </Button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-gray-900 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
