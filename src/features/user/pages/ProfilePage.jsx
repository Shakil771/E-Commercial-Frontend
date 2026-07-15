import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, Outlet } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth.js';
import ProfileForm from '../components/ProfileForm.jsx';
import Input from '../../../components/common/Input.jsx';
import Button from '../../../components/common/Button.jsx';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.js';
import { changePassword } from '../../auth/authSlice.js';
import { showError, showSuccess } from '../../../components/common/Toast.jsx';

const PasswordForm = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const newPassword = watch('newPassword');

  const onSubmit = async (formData) => {
    const result = await dispatch(changePassword({ currentPassword: formData.currentPassword, newPassword: formData.newPassword }));
    if (changePassword.fulfilled.match(result)) {
      showSuccess('Password updated successfully');
      reset();
    } else {
      showError(result.payload || 'Could not update password');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card space-y-4 p-6">
      <h3 className="text-lg font-bold text-gray-900">Change Password</h3>
      <Input
        label="Current Password"
        type="password"
        error={errors.currentPassword?.message}
        {...register('currentPassword', { required: 'Required' })}
      />
      <Input
        label="New Password"
        type="password"
        error={errors.newPassword?.message}
        {...register('newPassword', { required: 'Required', minLength: { value: 8, message: 'At least 8 characters' } })}
      />
      <Input
        label="Confirm New Password"
        type="password"
        error={errors.confirmNewPassword?.message}
        {...register('confirmNewPassword', {
          required: 'Required',
          validate: (value) => value === newPassword || 'Passwords do not match',
        })}
      />
      <Button type="submit" isLoading={status === 'loading'}>
        Update Password
      </Button>
    </form>
  );
};

const ProfilePage = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState('profile');

  if (!user) return null;

  return (
    <div className="container-page py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">My Profile</h1>

      <div className="mb-6 flex gap-6 border-b border-gray-200 text-sm font-medium text-gray-500">
        <button
          type="button"
          onClick={() => setTab('profile')}
          className={`border-b-2 pb-3 ${tab === 'profile' ? 'border-gray-900 text-gray-900' : 'border-transparent'}`}
        >
          Profile
        </button>
        <button
          type="button"
          onClick={() => setTab('password')}
          className={`border-b-2 pb-3 ${tab === 'password' ? 'border-gray-900 text-gray-900' : 'border-transparent'}`}
        >
          Password
        </button>
        <NavLink to="/profile/addresses" className="border-b-2 border-transparent pb-3 hover:text-gray-900">
          Addresses
        </NavLink>
      </div>

      <div className="max-w-xl">
        {tab === 'profile' && <ProfileForm user={user} />}
        {tab === 'password' && <PasswordForm />}
      </div>

      <Outlet />
    </div>
  );
};

export default ProfilePage;
