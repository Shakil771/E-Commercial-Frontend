import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../../components/common/Input.jsx';
import Button from '../../../components/common/Button.jsx';

const AddressForm = ({ initialValues, onSubmit, onCancel, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues || { country: 'Bangladesh' } });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Label (e.g. Home, Office)" {...register('label')} />
        <Input label="Full Name" error={errors.fullName?.message} {...register('fullName', { required: 'Required' })} />
      </div>
      <Input label="Phone" error={errors.phone?.message} {...register('phone', { required: 'Required' })} />
      <Input label="Address Line 1" error={errors.addressLine1?.message} {...register('addressLine1', { required: 'Required' })} />
      <Input label="Address Line 2 (optional)" {...register('addressLine2')} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Input label="City" error={errors.city?.message} {...register('city', { required: 'Required' })} />
        <Input label="State" error={errors.state?.message} {...register('state', { required: 'Required' })} />
        <Input label="Postal Code" error={errors.postalCode?.message} {...register('postalCode', { required: 'Required' })} />
      </div>
      <Input label="Country" error={errors.country?.message} {...register('country', { required: 'Required' })} />
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" className="h-4 w-4 rounded border-gray-300" {...register('isDefault')} />
        Set as default address
      </label>
      <div className="flex gap-3">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" isLoading={isSubmitting} className="flex-1">
          Save Address
        </Button>
      </div>
    </form>
  );
};

export default AddressForm;
