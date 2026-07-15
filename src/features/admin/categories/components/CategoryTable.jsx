import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useAppDispatch } from '../../../../app/hooks.js';
import { deleteCategory } from '../categorySlice.js';
import ConfirmDialog from '../../../../components/common/ConfirmDialog.jsx';
import { showError, showSuccess } from '../../../../components/common/Toast.jsx';

const CategoryTable = ({ categories, onEdit }) => {
  const dispatch = useAppDispatch();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await dispatch(deleteCategory(deleteTarget));
    setIsDeleting(false);
    setDeleteTarget(null);
    if (deleteCategory.fulfilled.match(result)) {
      showSuccess('Category deleted');
    } else {
      showError(result.payload || 'Could not delete category');
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500">
            <th className="py-2 pr-4 font-medium">Category</th>
            <th className="py-2 pr-4 font-medium">Description</th>
            <th className="py-2 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id} className="border-b border-gray-100">
              <td className="py-3 pr-4">
                <div className="flex items-center gap-3">
                  <img src={cat.image?.url || 'https://via.placeholder.com/40'} alt={cat.name} className="h-10 w-10 rounded-lg object-cover" />
                  <span className="font-medium text-gray-900">{cat.name}</span>
                </div>
              </td>
              <td className="max-w-sm truncate py-3 pr-4 text-gray-500">{cat.description}</td>
              <td className="py-3 text-right">
                <div className="flex justify-end gap-3 text-gray-400">
                  <button type="button" onClick={() => onEdit(cat)} className="hover:text-gray-900">
                    <FaEdit size={15} />
                  </button>
                  <button type="button" onClick={() => setDeleteTarget(cat._id)} className="hover:text-red-600">
                    <FaTrash size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete this category?"
        message="Categories with existing products or subcategories cannot be deleted."
        isLoading={isDeleting}
      />
    </div>
  );
};

export default CategoryTable;
