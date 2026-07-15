import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks.js';
import { getAllCoupons, createCoupon, updateCoupon } from '../couponSlice.js';
import CouponTable from '../components/CouponTable.jsx';
import CouponForm from '../components/CouponForm.jsx';
import Modal from '../../../../components/common/Modal.jsx';
import Spinner from '../../../../components/common/Spinner.jsx';
import Button from '../../../../components/common/Button.jsx';
import { showError, showSuccess } from '../../../../components/common/Toast.jsx';

const CouponManagePage = () => {
  const dispatch = useAppDispatch();
  const { list, status } = useAppSelector((state) => state.coupons);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(getAllCoupons({ limit: 50 }));
  }, [dispatch]);

  const handleAddNew = () => {
    setEditingCoupon(null);
    setModalOpen(true);
  };

  const handleEdit = (coupon) => {
    setEditingCoupon({ ...coupon, validUntil: coupon.validUntil?.slice(0, 10) });
    setModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    const result = editingCoupon
      ? await dispatch(updateCoupon({ id: editingCoupon._id, payload: formData }))
      : await dispatch(createCoupon(formData));
    setIsSubmitting(false);

    if (result.meta.requestStatus === 'fulfilled') {
      showSuccess(editingCoupon ? 'Coupon updated' : 'Coupon created');
      setModalOpen(false);
    } else {
      showError(result.payload || 'Could not save coupon');
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Manage Coupons</h1>
        <Button onClick={handleAddNew}>
          <FaPlus size={12} /> Add Coupon
        </Button>
      </div>

      <div className="card p-6">
        {status === 'loading' ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : (
          <CouponTable coupons={list} onEdit={handleEdit} />
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingCoupon ? 'Edit Coupon' : 'Add Coupon'} maxWidth="max-w-lg">
        <CouponForm
          initialValues={editingCoupon}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </div>
  );
};

export default CouponManagePage;
