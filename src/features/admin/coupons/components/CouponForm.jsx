import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../../../components/common/Input.jsx';
import Button from '../../../../components/common/Button.jsx';

const CouponForm = ({ initialValues, onSubmit, onCancel, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues || {
      code: '',
      description: '',
      discountType: 'percentage',
      discountValue: '',
      minOrderAmount: '',
      maxDiscountAmount: '',
      usageLimit: '',
      usageLimitPerUser: 1,
      validUntil: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Coupon Code" error={errors.code?.message} {...register('code', { required: 'Required' })} />
        <div>
          <label className="label-text" htmlFor="discountType">Discount Type</label>
          <select id="discountType" className="input-field" {...register('discountType', { required: true })}>
            <option value="percentage">Percentage</option>
            <option value="flat">Flat Amount</option>
          </select>
        </div>
      </div>

      <Input label="Description (optional)" {...register('description')} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Discount Value"
          type="number"
          step="0.01"
          error={errors.discountValue?.message}
          {...register('discountValue', { required: 'Required', min: 0 })}
        />
        <Input label="Max Discount Amount (optional)" type="number" step="0.01" {...register('maxDiscountAmount')} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Minimum Order Amount" type="number" step="0.01" {...register('minOrderAmount')} />
        <Input label="Usage Limit (total, optional)" type="number" {...register('usageLimit')} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Usage Limit Per User" type="number" {...register('usageLimitPerUser')} />
        <Input
          label="Valid Until"
          type="date"
          error={errors.validUntil?.message}
          {...register('validUntil', { required: 'Required' })}
        />
      </div>

      <div className="flex gap-3">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" isLoading={isSubmitting}>
          Save Coupon
        </Button>
      </div>
    </form>
  );
};

export default CouponForm;
