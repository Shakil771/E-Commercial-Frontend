import React, { useState } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Button from '../../../components/common/Button.jsx';
import { showError } from '../../../components/common/Toast.jsx';

const PaymentForm = ({ onSuccess, returnUrl }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: returnUrl },
      redirect: 'if_required',
    });

    setIsProcessing(false);

    if (error) {
      showError(error.message || 'Payment failed. Please try again');
      return;
    }

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      onSuccess(paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <Button type="submit" className="w-full" isLoading={isProcessing} disabled={!stripe}>
        Pay Now
      </Button>
      <p className="text-center text-xs text-gray-400">
        Test mode — use card number 4242 4242 4242 4242, any future date, any CVC.
      </p>
    </form>
  );
};

export default PaymentForm;
