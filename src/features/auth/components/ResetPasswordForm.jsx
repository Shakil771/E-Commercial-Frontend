import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.js';
import { confirmPasswordReset } from '../authSlice.js';
import Input from '../../../components/common/Input.jsx';
import Button from '../../../components/common/Button.jsx';
import { showError, showSuccess } from '../../../components/common/Toast.jsx';

const ResetPasswordForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { status } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = async (formData) => {
    const result = await dispatch(confirmPasswordReset({ token, password: formData.password }));
    if (confirmPasswordReset.fulfilled.match(result)) {
      showSuccess('Password reset successfully. You are now logged in');
      navigate('/', { replace: true });
    } else {
      showError(result.payload || 'Reset link is invalid or has expired');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Reset your password</h2>
        <p className="mt-1 text-sm text-gray-500">Choose a new password for your account</p>
      </div>

      <Input
        label="New password"
        type="password"
        placeholder="At least 8 characters"
        error={errors.password?.message}
        {...register('password', {
          required: 'Password is required',
          minLength: { value: 8, message: 'Password must be at least 8 characters' },
        })}
      />

      <Input
        label="Confirm new password"
        type="password"
        placeholder="Re-enter new password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword', {
          required: 'Please confirm your password',
          validate: (value) => value === password || 'Passwords do not match',
        })}
      />

      <Button type="submit" className="w-full" isLoading={status === 'loading'}>
        Reset Password
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
