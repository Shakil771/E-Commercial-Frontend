import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { useAppDispatch } from '../../../app/hooks.js';
import { removeFromWishlist } from '../wishlistSlice.js';
import { addToCart } from '../../cart/cartSlice.js';
import { formatCurrency } from '../../../utils/formatCurrency.js';
import { showError, showSuccess } from '../../../components/common/Toast.jsx';

const WishlistItem = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleRemove = async () => {
    const result = await dispatch(removeFromWishlist(product._id));
    if (removeFromWishlist.fulfilled.match(result)) {
      showSuccess('Removed from wishlist');
    }
  };

  const handleAddToCart = async () => {
    const result = await dispatch(addToCart({ productId: product._id, quantity: 1 }));
    if (addToCart.fulfilled.match(result)) {
      showSuccess('Added to cart');
    } else {
      showError(result.payload || 'Could not add to cart');
    }
  };

  return (
    <div className="card flex items-center gap-4 p-4">
      <Link to={`/product/${product.slug}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
        <img src={product.images?.[0]?.url} alt={product.name} className="h-full w-full object-cover" />
      </Link>
      <div className="flex-1 min-w-0">
        <Link to={`/product/${product.slug}`} className="truncate font-medium text-gray-900 hover:underline">
          {product.name}
        </Link>
        <p className="mt-1 font-semibold text-gray-900">{formatCurrency(product.finalPrice)}</p>
      </div>
      <button type="button" onClick={handleAddToCart} className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white hover:bg-gray-700">
        <FaShoppingCart size={14} />
      </button>
      <button type="button" onClick={handleRemove} className="text-gray-400 hover:text-red-600">
        <FaTrash size={14} />
      </button>
    </div>
  );
};

export default WishlistItem;
