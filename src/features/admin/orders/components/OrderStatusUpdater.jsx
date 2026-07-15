import React, { useState } from 'react';
import { useAppDispatch } from '../../../../app/hooks.js';
import { updateOrderStatus } from '../adminOrderSlice.js';
import Button from '../../../../components/common/Button.jsx';
import { showError, showSuccess } from '../../../../components/common/Toast.jsx';

const NEXT_STATUS_OPTIONS = {
  pending: ['processing', 'cancelled'],
  processing: ['shipped', 'cancelled'],
  shipped: ['delivered'],
  delivered: ['refunded'],
  cancelled: [],
  refunded: [],
};

const OrderStatusUpdater = ({ order }) => {
  const dispatch = useAppDispatch();
  const [nextStatus, setNextStatus] = useState('');
  const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber || '');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const options = NEXT_STATUS_OPTIONS[order.status] || [];

  if (options.length === 0) {
    return <p className="text-sm text-gray-400">No further status transitions available for this order.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nextStatus) return;

    setIsSubmitting(true);
    const result = await dispatch(
      updateOrderStatus({ id: order._id, status: nextStatus, note, trackingNumber: nextStatus === 'shipped' ? trackingNumber : undefined })
    );
    setIsSubmitting(false);

    if (updateOrderStatus.fulfilled.match(result)) {
      showSuccess('Order status updated');
      setNextStatus('');
      setNote('');
    } else {
      showError(result.payload || 'Could not update order status');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="label-text" htmlFor="nextStatus">Update Status</label>
        <select id="nextStatus" className="input-field" value={nextStatus} onChange={(e) => setNextStatus(e.target.value)}>
          <option value="">Select new status</option>
          {options.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {nextStatus === 'shipped' && (
        <div>
          <label className="label-text" htmlFor="tracking">Tracking Number</label>
          <input
            id="tracking"
            className="input-field"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
        </div>
      )}

      <div>
        <label className="label-text" htmlFor="note">Note (optional)</label>
        <input id="note" className="input-field" value={note} onChange={(e) => setNote(e.target.value)} />
      </div>

      <Button type="submit" isLoading={isSubmitting} disabled={!nextStatus}>
        Update Status
      </Button>
    </form>
  );
};

export default OrderStatusUpdater;
