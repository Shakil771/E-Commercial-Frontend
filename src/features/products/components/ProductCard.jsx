import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import Rating from '../../../components/common/Rating.jsx';
import Badge from '../../../components/common/Badge.jsx';
import { formatCurrency } from '../../../utils/formatCurrency.js';
import { useAppDispatch } from '../../../app/hooks.js';
import { addToCart } from '../../cart/cartSlice.js';
import { addToWishlist } from '../../wishlist/wishlistSlice.js';
import useAuth from '../../../hooks/useAuth.js';
import { showError, showSuccess } from '../../../components/common/Toast.jsx';

const ProductCard = ({ product }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const result = await dispatch(addToCart({ productId: product._id, quantity: 1 }));
    if (addToCart.fulfilled.match(result)) {
      showSuccess('Added to cart');
    } else {
      showError(result.payload || 'Could not add to cart');
    }
  };

  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      showError('Please sign in to use your wishlist');
      return;
    }
    const result = await dispatch(addToWishlist(product._id));
    if (addToWishlist.fulfilled.match(result)) {
      showSuccess('Added to wishlist');
    } else {
      showError(result.payload || 'Could not add to wishlist');
    }
  };

  return (
    <Link to={`/product/${product.slug}`} className="group card overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.images?.[0]?.url || 'https://via.placeholder.com/400'}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {product.discountPercentage > 0 && (
          <Badge className="absolute left-3 top-3 bg-red-600 text-white">-{product.discountPercentage}%</Badge>
        )}
        <button
          type="button"
          onClick={handleAddToWishlist}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow hover:text-red-500"
        >
          <FaHeart size={14} />
        </button>
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-900">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4">
        {product.brand && <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{product.brand}</p>}
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-gray-900">{product.name}</h3>
        <div className="mt-1.5">
          <Rating value={product.ratingsAverage} count={product.numReviews} />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-gray-900">{formatCurrency(product.finalPrice)}</span>
            {product.discountPrice != null && (
              <span className="text-xs text-gray-400 line-through">{formatCurrency(product.price)}</span>
            )}
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <FaShoppingCart size={14} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
