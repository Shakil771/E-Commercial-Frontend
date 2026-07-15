import React from 'react';
import { formatCurrency } from '../../../utils/formatCurrency.js';

const OrderSummary = ({ cart }) => {
  const discount = cart.coupon
    ? cart.coupon.discountType === 'percentage'
      ? Math.round(cart.subtotal * (cart.coupon.discountValue / 100) * 100) / 100
      : Math.min(cart.coupon.discountValue, cart.subtotal)
    : 0;

  return (
    <div className="card p-6">
      <h3 className="text-lg font-bold text-gray-900">Your Order</h3>
      <div className="mt-4 max-h-64 space-y-3 overflow-y-auto">
        {cart.items.map((item) => (
          <div key={item._id} className="flex items-center gap-3 text-sm">
            <img src={item.image} alt={item.name} className="h-12 w-12 rounded-lg object-cover" />
            <div className="flex-1">
              <p className="line-clamp-1 font-medium text-gray-900">{item.name}</p>
              <p className="text-gray-400">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold text-gray-900">{formatCurrency(item.price * item.quantity)}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{formatCurrency(cart.subtotal)}</span>
        </div>
        {cart.coupon && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}
        <p className="text-xs text-gray-400">Final shipping and tax will be calculated by the server</p>
      </div>
    </div>
  );
};

export default OrderSummary;
