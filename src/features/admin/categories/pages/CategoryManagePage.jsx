import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks.js';
import { getAllCategoriesAdmin, createCategory, updateCategory } from '../categorySlice.js';
import CategoryTable from '../components/CategoryTable.jsx';
import CategoryForm from '../components/CategoryForm.jsx';
import Modal from '../../../../components/common/Modal.jsx';
import Spinner from '../../../../components/common/Spinner.jsx';
import Button from '../../../../components/common/Button.jsx';
import { showError, showSuccess } from '../../../../components/common/Toast.jsx';

const CategoryManagePage = () => {
  const dispatch = useAppDispatch();
  const { list, status } = useAppSelector((state) => state.categories);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(getAllCategoriesAdmin());
  }, [dispatch]);

  const handleAddNew = () => {
    setEditingCategory(null);
    setModalOpen(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    const result = editingCategory
      ? await dispatch(updateCategory({ id: editingCategory._id, formData }))
      : await dispatch(createCategory(formData));
    setIsSubmitting(false);

    if (result.meta.requestStatus === 'fulfilled') {
      showSuccess(editingCategory ? 'Category updated' : 'Category created');
      setModalOpen(false);
    } else {
      showError(result.payload || 'Could not save category');
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Manage Categories</h1>
        <Button onClick={handleAddNew}>
          <FaPlus size={12} /> Add Category
        </Button>
      </div>

      <div className="card p-6">
        {status === 'loading' ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : (
          <CategoryTable categories={list} onEdit={handleEdit} />
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingCategory ? 'Edit Category' : 'Add Category'}>
        <CategoryForm
          initialValues={editingCategory}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </div>
  );
};

export default CategoryManagePage;
