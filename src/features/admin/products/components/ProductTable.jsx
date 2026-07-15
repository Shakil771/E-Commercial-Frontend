import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useAppDispatch } from '../../../../app/hooks.js';
import { deleteProduct } from '../adminProductSlice.js';
import ConfirmDialog from '../../../../components/common/ConfirmDialog.jsx';
import Badge from '../../../../components/common/Badge.jsx';
import { formatCurrency } from '../../../../utils/formatCurrency.js';
import { showError, showSuccess } from '../../../../components/common/Toast.jsx';

const ProductTable = ({ products }) => {
  const dispatch = useAppDispatch();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await dispatch(deleteProduct(deleteTarget));
    setIsDeleting(false);
    setDeleteTarget(null);
    if (deleteProduct.fulfilled.match(result)) {
      showSuccess('Product deleted');
    } else {
      showError(result.payload || 'Could not delete product');
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500">
            <th className="py-2 pr-4 font-medium">Product</th>
            <th className="py-2 pr-4 font-medium">Category</th>
            <th className="py-2 pr-4 font-medium">Price</th>
            <th className="py-2 pr-4 font-medium">Stock</th>
            <th className="py-2 pr-4 font-medium">Status</th>
            <th className="py-2 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b border-gray-100">
              <td className="py-3 pr-4">
                <div className="flex items-center gap-3">
                  <img src={product.images?.[0]?.url} alt={product.name} className="h-10 w-10 rounded-lg object-cover" />
                  <span className="line-clamp-1 max-w-xs font-medium text-gray-900">{product.name}</span>
                </div>
              </td>
              <td className="py-3 pr-4 text-gray-600">{product.category?.name}</td>
              <td className="py-3 pr-4 text-gray-900">{formatCurrency(product.price)}</td>
              <td className="py-3 pr-4 text-gray-600">{product.stock}</td>
              <td className="py-3 pr-4">
                <Badge className={product.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}>
                  {product.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </td>
              <td className="py-3 text-right">
                <div className="flex justify-end gap-3 text-gray-400">
                  <Link to={`/admin/products/${product._id}/edit`} className="hover:text-gray-900">
                    <FaEdit size={15} />
                  </Link>
                  <button type="button" onClick={() => setDeleteTarget(product._id)} className="hover:text-red-600">
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
        title="Delete this product?"
        message="This action cannot be undone."
        isLoading={isDeleting}
      />
    </div>
  );
};

export default ProductTable;
