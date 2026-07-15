import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingBag } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.js';
import { fetchCart } from '../cartSlice.js';
import CartItem from '../components/CartItem.jsx';
import CartSummary from '../components/CartSummary.jsx';
import EmptyState from '../../../components/common/EmptyState.jsx';
import Spinner from '../../../components/common/Spinner.jsx';
import Button from '../../../components/common/Button.jsx';

const CartPage = () => {
  const dispatch = useAppDispatch();
  const { cart, status } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (status === 'loading' && cart.items.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={<FaShoppingBag size={48} />}
          title="Your cart is empty"
          description="Looks like you haven't added anything to your cart yet."
          action={
            <Link to="/shop">
              <Button>Continue Shopping</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Shopping Cart</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="card p-6">
            {cart.items.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <CartSummary cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
