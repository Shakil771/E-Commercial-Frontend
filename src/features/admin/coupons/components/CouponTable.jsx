import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useAppDispatch } from '../../../../app/hooks.js';
import { deleteCoupon, updateCoupon } from '../couponSlice.js';
import ConfirmDialog from '../../../../components/common/ConfirmDialog.jsx';
import Badge from '../../../../components/common/Badge.jsx';
import { formatDate } from '../../../../utils/formatDate.js';
import { showError, showSuccess } from '../../../../components/common/Toast.jsx';

const CouponTable = ({ coupons, onEdit }) => {
  const dispatch = useAppDispatch();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await dispatch(deleteCoupon(deleteTarget));
    setIsDeleting(false);
    setDeleteTarget(null);
    if (deleteCoupon.fulfilled.match(result)) {
      showSuccess('Coupon deleted');
    } else {
      showError(result.payload || 'Could not delete coupon');
    }
  };

  const handleToggleActive = async (coupon) => {
    const result = await dispatch(updateCoupon({ id: coupon._id, payload: { isActive: !coupon.isActive } }));
    if (updateCoupon.fulfilled.match(result)) {
      showSuccess('Coupon updated');
    } else {
      showError(result.payload || 'Could not update coupon');
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500">
            <th className="py-2 pr-4 font-medium">Code</th>
            <th className="py-2 pr-4 font-medium">Discount</th>
            <th className="py-2 pr-4 font-medium">Used</th>
            <th className="py-2 pr-4 font-medium">Valid Until</th>
            <th className="py-2 pr-4 font-medium">Status</th>
            <th className="py-2 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon._id} className="border-b border-gray-100">
              <td className="py-3 pr-4 font-mono font-medium text-gray-900">{coupon.code}</td>
              <td className="py-3 pr-4 text-gray-600">
                {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `$${coupon.discountValue}`}
              </td>
              <td className="py-3 pr-4 text-gray-600">
                {coupon.usedCount}
                {coupon.usageLimit ? ` / ${coupon.usageLimit}` : ''}
              </td>
              <td className="py-3 pr-4 text-gray-500">{formatDate(coupon.validUntil)}</td>
              <td className="py-3 pr-4">
                <button type="button" onClick={() => handleToggleActive(coupon)}>
                  <Badge className={coupon.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}>
                    {coupon.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </button>
              </td>
              <td className="py-3 text-right">
                <div className="flex justify-end gap-3 text-gray-400">
                  <button type="button" onClick={() => onEdit(coupon)} className="hover:text-gray-900">
                    <FaEdit size={15} />
                  </button>
                  <button type="button" onClick={() => setDeleteTarget(coupon._id)} className="hover:text-red-600">
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
        title="Delete this coupon?"
        message="This action cannot be undone."
        isLoading={isDeleting}
      />
    </div>
  );
};

export default CouponTable;
