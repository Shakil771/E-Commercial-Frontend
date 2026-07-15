import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../app/hooks.js';
import { updateProfile, updateAvatar } from '../userSlice.js';
import { loadCurrentUser } from '../../auth/authSlice.js';
import Input from '../../../components/common/Input.jsx';
import Button from '../../../components/common/Button.jsx';
import { showError, showSuccess } from '../../../components/common/Toast.jsx';

const ProfileForm = ({ user }) => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { name: user.name, phone: user.phone || '' } });

  const onSubmit = async (formData) => {
    const result = await dispatch(updateProfile(formData));
    if (updateProfile.fulfilled.match(result)) {
      showSuccess('Profile updated successfully');
      dispatch(loadCurrentUser());
    } else {
      showError(result.payload || 'Could not update profile');
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    const result = await dispatch(updateAvatar(formData));
    if (updateAvatar.fulfilled.match(result)) {
      showSuccess('Avatar updated successfully');
      dispatch(loadCurrentUser());
    } else {
      showError(result.payload || 'Could not update avatar');
    }
  };

  return (
    <div className="card space-y-6 p-6">
      <div className="flex items-center gap-4">
        {user.avatar?.url ? (
          <img src={user.avatar.url} alt={user.name} className="h-16 w-16 rounded-full object-cover" />
        ) : (
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 text-xl font-bold text-white">
            {user.name?.charAt(0).toUpperCase()}
          </span>
        )}
        <div>
          <button type="button" onClick={() => fileInputRef.current?.click()} className="text-sm font-medium text-gray-900 hover:underline">
            Change avatar
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Full Name" error={errors.name?.message} {...register('name', { required: 'Name is required' })} />
        <Input label="Email" value={user.email} disabled className="opacity-60" />
        <Input label="Phone" error={errors.phone?.message} {...register('phone')} />
        <Button type="submit" isLoading={isSubmitting}>
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default ProfileForm;
