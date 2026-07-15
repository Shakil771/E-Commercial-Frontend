import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.js';
import { getAddresses, addAddress, updateAddress } from '../userSlice.js';
import AddressList from '../components/AddressList.jsx';
import AddressForm from '../components/AddressForm.jsx';
import Button from '../../../components/common/Button.jsx';
import Spinner from '../../../components/common/Spinner.jsx';
import { showError, showSuccess } from '../../../components/common/Toast.jsx';

const AddressBookPage = () => {
  const dispatch = useAppDispatch();
  const { addresses, status } = useAppSelector((state) => state.user);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(getAddresses());
  }, [dispatch]);

  const handleEdit = (address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setShowForm(true);
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    const result = editingAddress
      ? await dispatch(updateAddress({ addressId: editingAddress._id, payload: formData }))
      : await dispatch(addAddress(formData));
    setIsSubmitting(false);

    if (result.meta.requestStatus === 'fulfilled') {
      showSuccess(editingAddress ? 'Address updated' : 'Address added');
      setShowForm(false);
      setEditingAddress(null);
    } else {
      showError(result.payload || 'Could not save address');
    }
  };

  return (
    <div className="mt-8 max-w-2xl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Address Book</h2>
        {!showForm && <Button onClick={handleAddNew}>Add New Address</Button>}
      </div>

      {status === 'loading' ? (
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      ) : showForm ? (
        <div className="card p-6">
          <AddressForm
            initialValues={editingAddress}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingAddress(null);
            }}
            isSubmitting={isSubmitting}
          />
        </div>
      ) : (
        <AddressList addresses={addresses} onEdit={handleEdit} />
      )}
    </div>
  );
};

export default AddressBookPage;
