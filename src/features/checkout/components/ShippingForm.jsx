import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../../components/common/Input.jsx';
import Button from '../../../components/common/Button.jsx';

const ShippingForm = ({ initialValues, onSubmit, savedAddresses = [], onSelectSaved }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  return (
    <div>
      {savedAddresses.length > 0 && (
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-semibold text-gray-900">Saved Addresses</h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {savedAddresses.map((addr) => (
              <button
                key={addr._id}
                type="button"
                onClick={() => onSelectSaved(addr)}
                className="rounded-lg border border-gray-300 p-3 text-left text-sm hover:border-gray-900"
              >
                <p className="font-medium text-gray-900">{addr.fullName}</p>
                <p className="text-gray-500">
                  {addr.addressLine1}, {addr.city}, {addr.state} {addr.postalCode}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Full Name" error={errors.fullName?.message} {...register('fullName', { required: 'Full name is required' })} />
          <Input label="Phone" error={errors.phone?.message} {...register('phone', { required: 'Phone is required' })} />
        </div>
        <Input label="Address Line 1" error={errors.addressLine1?.message} {...register('addressLine1', { required: 'Address is required' })} />
        <Input label="Address Line 2 (optional)" {...register('addressLine2')} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Input label="City" error={errors.city?.message} {...register('city', { required: 'City is required' })} />
          <Input label="State" error={errors.state?.message} {...register('state', { required: 'State is required' })} />
          <Input label="Postal Code" error={errors.postalCode?.message} {...register('postalCode', { required: 'Postal code is required' })} />
        </div>
        <Input label="Country" error={errors.country?.message} {...register('country', { required: 'Country is required' })} />

        <Button type="submit" className="w-full">
          Continue to Payment
        </Button>
      </form>
    </div>
  );
};

export default ShippingForm;
