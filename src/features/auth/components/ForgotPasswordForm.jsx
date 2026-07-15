import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.js';
import { requestPasswordReset } from '../authSlice.js';
import Input from '../../../components/common/Input.jsx';
import Button from '../../../components/common/Button.jsx';
import { showError } from '../../../components/common/Toast.jsx';

const ForgotPasswordForm = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    const result = await dispatch(requestPasswordReset(formData));
    if (requestPasswordReset.fulfilled.match(result)) {
      setSubmitted(true);
    } else {
      showError(result.payload || 'Something went wrong');
    }
  };

  if (submitted) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Check your email</h2>
        <p className="mt-2 text-sm text-gray-500">
          If an account with that email exists, we&apos;ve sent a password reset link.
        </p>
        <Link to="/login" className="btn-primary mt-6 inline-flex">
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Forgot password?</h2>
        <p className="mt-1 text-sm text-gray-500">Enter your email and we&apos;ll send you a reset link</p>
      </div>

      <Input
        label="Email address"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register('email', { required: 'Email is required' })}
      />

      <Button type="submit" className="w-full" isLoading={status === 'loading'}>
        Send Reset Link
      </Button>

      <p className="text-center text-sm text-gray-500">
        Remembered your password?{' '}
        <Link to="/login" className="font-semibold text-gray-900 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
