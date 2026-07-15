import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { useAppDispatch } from '../../../app/hooks.js';
import { updateCartItemQuantity, removeCartItem } from '../cartSlice.js';
import { formatCurrency } from '../../../utils/formatCurrency.js';
import { showError } from '../../../components/common/Toast.jsx';

const CartItem = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    const result = await dispatch(updateCartItemQuantity({ itemId: item._id, quantity: newQuantity }));
    if (updateCartItemQuantity.rejected.match(result)) {
      showError(result.payload || 'Could not update quantity');
    }
  };

  const handleRemove = async () => {
    const result = await dispatch(removeCartItem(item._id));
    if (removeCartItem.rejected.match(result)) {
      showError(result.payload || 'Could not remove item');
    }
  };

  return (
    <div className="flex items-center gap-4 border-b border-gray-100 py-4 last:border-none">
      <Link to={`/product/${item.product}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
      </Link>

      <div className="flex-1 min-w-0">
        <p className="truncate font-medium text-gray-900">{item.name}</p>
        <p className="mt-1 text-sm text-gray-500">{formatCurrency(item.price)}</p>
      </div>

      <div className="flex items-center rounded-lg border border-gray-300">
        <button type="button" onClick={() => handleQuantityChange(item.quantity - 1)} className="px-2.5 py-1.5 text-gray-600">
          -
        </button>
        <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
        <button type="button" onClick={() => handleQuantityChange(item.quantity + 1)} className="px-2.5 py-1.5 text-gray-600">
          +
        </button>
      </div>

      <p className="w-20 text-right font-semibold text-gray-900">{formatCurrency(item.price * item.quantity)}</p>

      <button type="button" onClick={handleRemove} className="text-gray-400 hover:text-red-600">
        <FaTrash size={14} />
      </button>
    </div>
  );
};

export default CartItem;
