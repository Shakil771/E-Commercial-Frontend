import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.js';
import { getProductDetails, getRelatedProducts, clearCurrentProduct } from '../productSlice.js';
import { addToCart } from '../../cart/cartSlice.js';
import { addToWishlist } from '../../wishlist/wishlistSlice.js';
import ProductGallery from '../components/ProductGallery.jsx';
import ProductReviews from '../components/ProductReviews.jsx';
import ProductCard from '../components/ProductCard.jsx';
import Rating from '../../../components/common/Rating.jsx';
import Button from '../../../components/common/Button.jsx';
import Spinner from '../../../components/common/Spinner.jsx';
import { formatCurrency } from '../../../utils/formatCurrency.js';
import useAuth from '../../../hooks/useAuth.js';
import { showError, showSuccess } from '../../../components/common/Toast.jsx';

const ProductDetailsPage = () => {
  const { idOrSlug } = useParams();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const { current: product, detailsStatus, related } = useAppSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    dispatch(getProductDetails(idOrSlug));
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, idOrSlug]);

  useEffect(() => {
    if (product?._id) {
      dispatch(getRelatedProducts(product._id));
    }
  }, [dispatch, product?._id]);

  if (detailsStatus === 'loading' || !product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const effectiveStock = selectedVariant ? selectedVariant.stock : product.stock;

  const handleAddToCart = async () => {
    const result = await dispatch(
      addToCart({ productId: product._id, variantId: selectedVariant?._id, quantity })
    );
    if (addToCart.fulfilled.match(result)) {
      showSuccess('Added to cart');
    } else {
      showError(result.payload || 'Could not add to cart');
    }
  };

  const handleAddToWishlist = async () => {
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
    <div className="container-page py-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} />

        <div>
          {product.brand && <p className="text-sm font-medium uppercase tracking-wide text-gray-400">{product.brand}</p>}
          <h1 className="mt-1 text-2xl font-bold text-gray-900">{product.name}</h1>
          <div className="mt-2">
            <Rating value={product.ratingsAverage} count={product.numReviews} />
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">{formatCurrency(product.finalPrice)}</span>
            {product.discountPrice != null && (
              <span className="text-lg text-gray-400 line-through">{formatCurrency(product.price)}</span>
            )}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-gray-600">{product.shortDescription || product.description}</p>

          <div className="mt-4 flex items-center gap-2 text-sm">
            {effectiveStock > 0 ? (
              <>
                <FaCheckCircle className="text-green-500" /> In Stock ({effectiveStock} available)
              </>
            ) : (
              <>
                <FaTimesCircle className="text-red-500" /> Out of Stock
              </>
            )}
          </div>

          {product.variants?.length > 0 && (
            <div className="mt-6">
              <h4 className="mb-2 text-sm font-semibold text-gray-900">Select Option</h4>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant._id}
                    type="button"
                    onClick={() => setSelectedVariant(variant)}
                    disabled={variant.stock === 0}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40 ${
                      selectedVariant?._id === variant._id ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 text-gray-700'
                    }`}
                  >
                    {[variant.size, variant.color].filter(Boolean).join(' / ')}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-lg border border-gray-300">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-lg font-medium text-gray-600"
              >
                -
              </button>
              <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(effectiveStock || 1, q + 1))}
                className="px-3 py-2 text-lg font-medium text-gray-600"
              >
                +
              </button>
            </div>

            <Button onClick={handleAddToCart} disabled={effectiveStock === 0} className="flex-1">
              <FaShoppingCart size={14} /> Add to Cart
            </Button>

            <button
              type="button"
              onClick={handleAddToWishlist}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 text-gray-500 hover:text-red-500"
            >
              <FaHeart size={16} />
            </button>
          </div>

          {product.specifications?.length > 0 && (
            <div className="mt-8">
              <h4 className="mb-3 text-sm font-semibold text-gray-900">Specifications</h4>
              <dl className="divide-y divide-gray-100 rounded-lg border border-gray-200">
                {product.specifications.map((spec) => (
                  <div key={spec.key} className="flex justify-between px-4 py-2.5 text-sm">
                    <dt className="text-gray-500">{spec.key}</dt>
                    <dd className="font-medium text-gray-900">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 max-w-3xl">
        <h3 className="text-lg font-bold text-gray-900">Description</h3>
        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-600">{product.description}</p>
      </div>

      <div className="mt-12 max-w-3xl">
        <ProductReviews productId={product._id} />
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h3 className="mb-4 text-lg font-bold text-gray-900">You may also like</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
