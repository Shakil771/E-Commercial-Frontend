import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks.js';
import { applyCartCoupon, removeCartCoupon } from '../cartSlice.js';
import { formatCurrency } from '../../../utils/formatCurrency.js';
import Button from '../../../components/common/Button.jsx';
import { showError, showSuccess } from '../../../components/common/Toast.jsx';
import useAuth from '../../../hooks/useAuth.js';

const calculateDiscount = (subtotal, coupon) => {
  if (!coupon) return 0;
  if (coupon.discountType === 'percentage') {
    return Math.round(subtotal * (coupon.discountValue / 100) * 100) / 100;
  }
  return Math.min(coupon.discountValue, subtotal);
};

const CartSummary = ({ cart, showCheckoutButton = true }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [couponCode, setCouponCode] = useState('');
  const [applying, setApplying] = useState(false);

  const discount = calculateDiscount(cart.subtotal, cart.coupon);
  const estimatedTotal = Math.max(cart.subtotal - discount, 0);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setApplying(true);
    const result = await dispatch(applyCartCoupon(couponCode.trim()));
    setApplying(false);
    if (applyCartCoupon.fulfilled.match(result)) {
      showSuccess('Coupon applied');
      setCouponCode('');
    } else {
      showError(result.payload || 'Invalid coupon code');
    }
  };

  const handleRemoveCoupon = async () => {
    await dispatch(removeCartCoupon());
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-bold text-gray-900">Order Summary</h3>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({cart.totalItems} items)</span>
          <span>{formatCurrency(cart.subtotal)}</span>
        </div>
        {cart.coupon && (
          <div className="flex justify-between text-green-600">
            <span>Discount ({cart.coupon.code})</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}
        <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-bold text-gray-900">
          <span>Estimated Total</span>
          <span>{formatCurrency(estimatedTotal)}</span>
        </div>
        <p className="text-xs text-gray-400">Shipping and taxes calculated at checkout</p>
      </div>

      {cart.coupon ? (
        <div className="mt-4 flex items-center justify-between rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
          <span>Coupon &quot;{cart.coupon.code}&quot; applied</span>
          <button type="button" onClick={handleRemoveCoupon} className="font-medium underline">
            Remove
          </button>
        </div>
      ) : (
        <form onSubmit={handleApplyCoupon} className="mt-4 flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Coupon code"
            className="input-field flex-1"
          />
          <Button type="submit" variant="secondary" isLoading={applying}>
            Apply
          </Button>
        </form>
      )}

      {showCheckoutButton && (
        <Button onClick={handleCheckout} className="mt-6 w-full" disabled={cart.items.length === 0}>
          Proceed to Checkout
        </Button>
      )}
    </div>
  );
};

export default CartSummary;
