import React, { useState } from 'react';
import Badge from '../../../components/common/Badge.jsx';
import Button from '../../../components/common/Button.jsx';
import ConfirmDialog from '../../../components/common/ConfirmDialog.jsx';
import OrderTracking from './OrderTracking.jsx';
import { formatCurrency } from '../../../utils/formatCurrency.js';
import { formatDate } from '../../../utils/formatDate.js';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../../../utils/constants.js';
import { useAppDispatch } from '../../../app/hooks.js';
import { cancelOrder } from '../orderSlice.js';
import { showError, showSuccess } from '../../../components/common/Toast.jsx';

const OrderDetails = ({ order }) => {
  const dispatch = useAppDispatch();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const canCancel = ['pending', 'processing'].includes(order.status);

  const handleCancel = async () => {
    setCancelling(true);
    const result = await dispatch(cancelOrder({ id: order._id, reason: 'Cancelled by customer' }));
    setCancelling(false);
    setConfirmOpen(false);
    if (cancelOrder.fulfilled.match(result)) {
      showSuccess('Order cancelled');
    } else {
      showError(result.payload || 'Could not cancel order');
    }
  };

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{order.orderNumber}</h2>
            <p className="text-sm text-gray-500">Placed on {formatDate(order.createdAt)}</p>
          </div>
          <Badge className={ORDER_STATUS_COLORS[order.status]}>{ORDER_STATUS_LABELS[order.status]}</Badge>
        </div>

        <div className="mt-6">
          <OrderTracking order={order} />
        </div>

        {canCancel && (
          <div className="mt-6">
            <Button variant="danger" onClick={() => setConfirmOpen(true)}>
              Cancel Order
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Shipping Address</h3>
          <p className="text-sm text-gray-600">
            {order.shippingAddress.fullName}
            <br />
            {order.shippingAddress.addressLine1}
            {order.shippingAddress.addressLine2 && <>, {order.shippingAddress.addressLine2}</>}
            <br />
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
            <br />
            {order.shippingAddress.country}
            <br />
            {order.shippingAddress.phone}
          </p>
        </div>

        <div className="card p-6">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Payment</h3>
          <p className="text-sm text-gray-600">
            Method: <span className="font-medium capitalize">{order.paymentMethod}</span>
          </p>
          <p className="text-sm text-gray-600">
            Status: <span className="font-medium capitalize">{order.paymentStatus}</span>
          </p>
          {order.isPaid && <p className="text-sm text-gray-600">Paid on {formatDate(order.paidAt)}</p>}
        </div>
      </div>

      <div className="card p-6">
        <h3 className="mb-4 text-sm font-semibold text-gray-900">Items</h3>
        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold text-gray-900">{formatCurrency(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-2 border-t border-gray-100 pt-4 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>{formatCurrency(order.itemsPrice)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>{order.shippingPrice === 0 ? 'Free' : formatCurrency(order.shippingPrice)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>{formatCurrency(order.taxPrice)}</span>
          </div>
          {order.discountAmount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount {order.couponCode ? `(${order.couponCode})` : ''}</span>
              <span>-{formatCurrency(order.discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-bold text-gray-900">
            <span>Total</span>
            <span>{formatCurrency(order.totalPrice)}</span>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleCancel}
        title="Cancel this order?"
        message="This action cannot be undone. Your items will be restocked and no charges will be made."
        isLoading={cancelling}
      />
    </div>
  );
};

export default OrderDetails;
