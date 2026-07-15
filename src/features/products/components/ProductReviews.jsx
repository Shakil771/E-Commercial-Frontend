import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.js';
import { getProductReviews, createReview, deleteReview } from '../../reviews/reviewSlice.js';
import Rating from '../../../components/common/Rating.jsx';
import Button from '../../../components/common/Button.jsx';
import EmptyState from '../../../components/common/EmptyState.jsx';
import { formatDate } from '../../../utils/formatDate.js';
import useAuth from '../../../hooks/useAuth.js';
import { showError, showSuccess } from '../../../components/common/Toast.jsx';

const ProductReviews = ({ productId }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAuth();
  const { list: reviews, status } = useAppSelector((state) => state.reviews);
  const [showForm, setShowForm] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { rating: 5, comment: '' } });

  useEffect(() => {
    dispatch(getProductReviews({ productId, params: { limit: 20 } }));
  }, [dispatch, productId]);

  const onSubmit = async (formData) => {
    const form = new FormData();
    form.append('rating', formData.rating);
    form.append('title', formData.title || '');
    form.append('comment', formData.comment);

    const result = await dispatch(createReview({ productId, formData: form }));
    if (createReview.fulfilled.match(result)) {
      showSuccess('Review submitted');
      reset();
      setShowForm(false);
    } else {
      showError(result.payload || 'Could not submit review');
    }
  };

  const handleDelete = async (reviewId) => {
    const result = await dispatch(deleteReview(reviewId));
    if (deleteReview.fulfilled.match(result)) {
      showSuccess('Review deleted');
    } else {
      showError(result.payload || 'Could not delete review');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Customer Reviews</h3>
        {isAuthenticated && (
          <Button variant="secondary" onClick={() => setShowForm((prev) => !prev)}>
            {showForm ? 'Cancel' : 'Write a Review'}
          </Button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4 rounded-xl border border-gray-200 p-4">
          <div>
            <label className="label-text" htmlFor="rating">Rating</label>
            <select id="rating" className="input-field" {...register('rating', { required: true })}>
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-text" htmlFor="title">Title (optional)</label>
            <input id="title" className="input-field" {...register('title')} />
          </div>
          <div>
            <label className="label-text" htmlFor="comment">Your review</label>
            <textarea
              id="comment"
              rows={4}
              className="input-field"
              {...register('comment', { required: 'Please write a comment', maxLength: 1000 })}
            />
            {errors.comment && <p className="mt-1 text-sm text-red-600">{errors.comment.message}</p>}
          </div>
          <Button type="submit">Submit Review</Button>
        </form>
      )}

      <div className="mt-6 space-y-6">
        {status === 'succeeded' && reviews.length === 0 && (
          <EmptyState title="No reviews yet" description="Be the first to share your thoughts on this product." />
        )}

        {reviews.map((review) => (
          <div key={review._id} className="border-b border-gray-100 pb-6 last:border-none">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">{review.user?.name || 'Anonymous'}</span>
                  {review.isVerifiedPurchase && (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <Rating value={review.rating} />
              </div>
              <span className="text-xs text-gray-400">{formatDate(review.createdAt)}</span>
            </div>
            {review.title && <p className="mt-2 font-medium text-gray-900">{review.title}</p>}
            <p className="mt-1 text-sm text-gray-600">{review.comment}</p>
            {user && review.user?._id === user._id && (
              <button
                type="button"
                onClick={() => handleDelete(review._id)}
                className="mt-2 text-xs font-medium text-red-600 hover:underline"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
