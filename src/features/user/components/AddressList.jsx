import React, { useState } from 'react';
import { FaEdit, FaTrash, FaCheckCircle } from 'react-icons/fa';
import { useAppDispatch } from '../../../app/hooks.js';
import { deleteAddress } from '../userSlice.js';
import ConfirmDialog from '../../../components/common/ConfirmDialog.jsx';
import { showSuccess, showError } from '../../../components/common/Toast.jsx';

const AddressList = ({ addresses, onEdit }) => {
  const dispatch = useAppDispatch();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await dispatch(deleteAddress(deleteTarget));
    setIsDeleting(false);
    setDeleteTarget(null);
    if (deleteAddress.fulfilled.match(result)) {
      showSuccess('Address deleted');
    } else {
      showError(result.payload || 'Could not delete address');
    }
  };

  if (addresses.length === 0) {
    return <p className="text-sm text-gray-500">You haven&apos;t added any addresses yet.</p>;
  }

  return (
    <div className="space-y-3">
      {addresses.map((address) => (
        <div key={address._id} className="card flex items-start justify-between p-4">
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-gray-900">{address.label || 'Address'}</p>
              {address.isDefault && (
                <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                  <FaCheckCircle size={12} /> Default
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-600">
              {address.fullName} &middot; {address.phone}
            </p>
            <p className="text-sm text-gray-500">
              {address.addressLine1}, {address.city}, {address.state} {address.postalCode}, {address.country}
            </p>
          </div>
          <div className="flex shrink-0 gap-3 text-gray-400">
            <button type="button" onClick={() => onEdit(address)} className="hover:text-gray-900">
              <FaEdit size={15} />
            </button>
            <button type="button" onClick={() => setDeleteTarget(address._id)} className="hover:text-red-600">
              <FaTrash size={15} />
            </button>
          </div>
        </div>
      ))}

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete this address?"
        message="This action cannot be undone."
        isLoading={isDeleting}
      />
    </div>
  );
};

export default AddressList;
