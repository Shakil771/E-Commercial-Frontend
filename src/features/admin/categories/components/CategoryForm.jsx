import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../../../components/common/Input.jsx';
import Button from '../../../../components/common/Button.jsx';

const CategoryForm = ({ initialValues, onSubmit, onCancel, isSubmitting }) => {
  const [file, setFile] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues || { name: '', description: '' } });

  const submitHandler = (formData) => {
    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description || '');
    if (file) form.append('image', file);
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <Input label="Category Name" error={errors.name?.message} {...register('name', { required: 'Required' })} />
      <div>
        <label className="label-text" htmlFor="description">Description</label>
        <textarea id="description" rows={3} className="input-field" {...register('description')} />
      </div>
      <div>
        <label className="label-text" htmlFor="image">Category Image</label>
        <input id="image" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="text-sm" />
      </div>
      <div className="flex gap-3">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" isLoading={isSubmitting}>
          Save Category
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
