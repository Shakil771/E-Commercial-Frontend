import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks.js';
import { createProduct, updateProduct } from '../adminProductSlice.js';
import { getAllCategoriesAdmin } from '../../categories/categorySlice.js';
import { getProductDetails, clearCurrentProduct } from '../../../products/productSlice.js';
import ProductForm from '../components/ProductForm.jsx';
import Spinner from '../../../../components/common/Spinner.jsx';
import { showError, showSuccess } from '../../../../components/common/Toast.jsx';
import axiosInstance from '../../../../services/axiosInstance.js';

const ProductEditPage = () => {
  const { id } = useParams();
  const isNew = !id || id === 'new';
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { list: categories } = useAppSelector((state) => state.categories);
  const { current: product, detailsStatus } = useAppSelector((state) => state.products);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(getAllCategoriesAdmin());
    if (!isNew) {
      dispatch(getProductDetails(id));
    }
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, id, isNew]);

  const handleSubmit = async (formData) => {
    
    setIsSubmitting(true);
    const result = isNew
      ? await dispatch(createProduct(formData))
      : await dispatch(updateProduct({ id, formData }));
    setIsSubmitting(false);

    if (result.meta.requestStatus === 'fulfilled') {
      showSuccess(isNew ? 'Product created successfully' : 'Product updated successfully');
      navigate('/admin/products');
    } else {
      showError(result.payload || 'Could not save product');
    }
  };

  const handleRemoveExistingImage = async (publicId) => {
    try {
      await axiosInstance.delete(`/products/${id}/images/${encodeURIComponent(publicId)}`);
      dispatch(getProductDetails(id));
      showSuccess('Image removed');
    } catch (error) {
      showError(error.response?.data?.message || 'Could not remove image');
    }
  };

  if (!isNew && (detailsStatus === 'loading' || !product)) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const initialValues = isNew
    ? null
    : {
        ...product,
        category: product.category?._id,
        tags: product.tags?.join(', '),
      };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">{isNew ? 'Add Product' : 'Edit Product'}</h1>
      <div className="card max-w-3xl p-6">
        <ProductForm
          initialValues={initialValues}
          categories={categories}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onRemoveExistingImage={!isNew ? handleRemoveExistingImage : undefined}
        />
      </div>
    </div>
  );
};

export default ProductEditPage;
