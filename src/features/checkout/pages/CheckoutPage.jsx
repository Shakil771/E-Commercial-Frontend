import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.js';
import { fetchCart } from '../../cart/cartSlice.js';
import { getAddresses } from '../../user/userSlice.js';
import { createOrder, clearOrderState } from '../../orders/orderSlice.js';
import { setShippingAddress, setPaymentMethod } from '../checkoutSlice.js';
import ShippingForm from '../components/ShippingForm.jsx';
import PaymentForm from '../components/PaymentForm.jsx';
import OrderSummary from '../components/OrderSummary.jsx';
import Spinner from '../../../components/common/Spinner.jsx';
import Button from '../../../components/common/Button.jsx';
import { STRIPE_PUBLISHABLE_KEY } from '../../../utils/constants.js';
import { showError, showSuccess } from '../../../components/common/Toast.jsx';

const stripePromise = STRIPE_PUBLISHABLE_KEY ? loadStripe(STRIPE_PUBLISHABLE_KEY) : null;

const STEPS = { SHIPPING: 1, PAYMENT_METHOD: 2, PAYMENT: 3 };

const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { cart, status: cartStatus } = useAppSelector((state) => state.cart);
  const { addresses } = useAppSelector((state) => state.user);
  const { shippingAddress, paymentMethod } = useAppSelector((state) => state.checkout);
  const { lastCreatedOrder, clientSecret, status: orderStatus } = useAppSelector((state) => state.orders);
  const [step, setStep] = useState(STEPS.SHIPPING);

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(getAddresses());
    dispatch(clearOrderState());
  }, [dispatch]);

  useEffect(() => {
    if (cartStatus === 'succeeded' && cart.items.length === 0 && !lastCreatedOrder) {
      navigate('/cart');
    }
  }, [cartStatus, cart.items.length, lastCreatedOrder, navigate]);

  const handleShippingSubmit = (data) => {
    dispatch(setShippingAddress(data));
    setStep(STEPS.PAYMENT_METHOD);
  };

  const handleSelectSavedAddress = (address) => {
    dispatch(setShippingAddress(address));
    setStep(STEPS.PAYMENT_METHOD);
  };

  const handlePlaceOrder = async () => {
    const result = await dispatch(
      createOrder({
        shippingAddress,
        paymentMethod,
      })
    );

    if (createOrder.fulfilled.match(result)) {
      if (paymentMethod === 'cod') {
        showSuccess('Order placed successfully!');
        navigate(`/orders/${result.payload.order._id}`);
      } else {
        setStep(STEPS.PAYMENT);
      }
    } else {
      showError(result.payload || 'Could not place order');
    }
  };

  const handlePaymentSuccess = () => {
    showSuccess('Payment successful! Your order is confirmed');
    navigate(`/orders/${lastCreatedOrder._id}`);
  };

  if (cartStatus === 'loading' && cart.items.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Checkout</h1>

      <div className="mb-8 flex items-center gap-4 text-sm font-medium text-gray-400">
        <span className={step >= STEPS.SHIPPING ? 'text-gray-900' : ''}>1. Shipping</span>
        <span>&rarr;</span>
        <span className={step >= STEPS.PAYMENT_METHOD ? 'text-gray-900' : ''}>2. Payment Method</span>
        <span>&rarr;</span>
        <span className={step >= STEPS.PAYMENT ? 'text-gray-900' : ''}>3. Payment</span>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="card p-6">
            {step === STEPS.SHIPPING && (
              <ShippingForm
                initialValues={shippingAddress || { country: 'Bangladesh' }}
                onSubmit={handleShippingSubmit}
                savedAddresses={addresses}
                onSelectSaved={handleSelectSavedAddress}
              />
            )}

            {step === STEPS.PAYMENT_METHOD && (
              <div>
                <h3 className="mb-4 text-lg font-bold text-gray-900">Select Payment Method</h3>
                <div className="space-y-3">
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-300 p-4 has-[:checked]:border-gray-900">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => dispatch(setPaymentMethod('card'))}
                    />
                    <div>
                      <p className="font-medium text-gray-900">Credit / Debit Card</p>
                      <p className="text-sm text-gray-500">Secure payment via Stripe</p>
                    </div>
                  </label>
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-300 p-4 has-[:checked]:border-gray-900">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => dispatch(setPaymentMethod('cod'))}
                    />
                    <div>
                      <p className="font-medium text-gray-900">Cash on Delivery</p>
                      <p className="text-sm text-gray-500">Pay when your order arrives</p>
                    </div>
                  </label>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button variant="secondary" onClick={() => setStep(STEPS.SHIPPING)}>
                    Back
                  </Button>
                  <Button onClick={handlePlaceOrder} isLoading={orderStatus === 'loading'} className="flex-1">
                    {paymentMethod === 'cod' ? 'Place Order' : 'Continue to Payment'}
                  </Button>
                </div>
              </div>
            )}

            {step === STEPS.PAYMENT && clientSecret && stripePromise && (
              <div>
                <h3 className="mb-4 text-lg font-bold text-gray-900">Payment Details</h3>
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <PaymentForm onSuccess={handlePaymentSuccess} returnUrl={`${window.location.origin}/orders/${lastCreatedOrder?._id}`} />
                </Elements>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <OrderSummary cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
