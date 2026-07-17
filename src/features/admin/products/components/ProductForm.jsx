import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../../../components/common/Input.jsx';
import Button from '../../../../components/common/Button.jsx';
import ImageUploader from './ImageUploader.jsx';

const ProductForm = ({ initialValues, categories, onSubmit, isSubmitting, onRemoveExistingImage }) => {
  const [newFiles, setNewFiles] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues || {
      name: '',
      shortDescription: '',
      description: '',
      brand: '',
      category: '',
      price: '',
      discountPrice: '',
      stock: '',
      sku: '',
      tags: '',
      isFeatured: false,
    },
  });

  // const submitHandler = (formData) => {
  //   const form = new FormData();
  //   Object.entries(formData).forEach(([key, value]) => {
  //     if (value !== undefined && value !== null && value !== '') {
  //       form.append(key, value);
  //     }
  //   });
  //   newFiles.forEach((file) => form.append('images', file));
  //   onSubmit(form);
  // };


  const submitHandler = (data) => {
    const form = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') return;

      if (key === 'tags') {
        form.append(key, value);
      } else if (key === 'variants' || key === 'specifications') {
        form.append(key, JSON.stringify(value));
      } else {
        form.append(key, value);
      }
    });

    newFiles.forEach((file) => form.append('images', file));

    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Product Name" error={errors.name?.message} {...register('name', { required: 'Required' })} />
        <Input label="Brand" {...register('brand')} />
      </div>

      <Input label="Short Description" {...register('shortDescription')} />

      <div>
        <label className="label-text" htmlFor="description">Full Description</label>
        <textarea id="description" rows={5} className="input-field" {...register('description', { required: 'Required' })} />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="label-text" htmlFor="category">Category</label>
          <select id="category" className="input-field" {...register('category', { required: 'Required' })}>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
        </div>
        <Input label="SKU (optional)" {...register('sku')} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Input label="Price" type="number" step="0.01" error={errors.price?.message} {...register('price', { required: 'Required', min: 0 })} />
        <Input label="Discount Price (optional)" type="number" step="0.01" {...register('discountPrice')} />
        <Input label="Stock" type="number" error={errors.stock?.message} {...register('stock', { required: 'Required', min: 0 })} />
      </div>

      <Input label="Tags (comma separated)" placeholder="wireless, audio, bestseller" {...register('tags')} />

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" className="h-4 w-4 rounded border-gray-300" {...register('isFeatured')} />
        Feature this product on the homepage
      </label>

      <ImageUploader
        existingImages={initialValues?.images || []}
        onRemoveExisting={onRemoveExistingImage}
        newFiles={newFiles}
        onFilesChange={setNewFiles}
      />

      <Button type="submit" isLoading={isSubmitting}>
        Save Product
      </Button>
    </form>
  );
};

export default ProductForm;
