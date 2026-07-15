import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks.js';
import { getAllReviewsAdmin, deleteReviewAdmin } from '../adminReviewSlice.js';
import Rating from '../../../../components/common/Rating.jsx';
import ConfirmDialog from '../../../../components/common/ConfirmDialog.jsx';
import Pagination from '../../../../components/common/Pagination.jsx';
import Spinner from '../../../../components/common/Spinner.jsx';
import EmptyState from '../../../../components/common/EmptyState.jsx';
import { formatDate } from '../../../../utils/formatDate.js';
import usePagination from '../../../../hooks/usePagination.js';
import { showError, showSuccess } from '../../../../components/common/Toast.jsx';

const ReviewManagePage = () => {
  const dispatch = useAppDispatch();
  const { page, setPage } = usePagination();
  const { list, meta, status } = useAppSelector((state) => state.adminReviews);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    dispatch(getAllReviewsAdmin({ page, limit: 20 }));
  }, [dispatch, page]);

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await dispatch(deleteReviewAdmin(deleteTarget));
    setIsDeleting(false);
    setDeleteTarget(null);
    if (deleteReviewAdmin.fulfilled.match(result)) {
      showSuccess('Review deleted');
    } else {
      showError(result.payload || 'Could not delete review');
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Manage Reviews</h1>

      <div className="card p-6">
        {status === 'loading' ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : list.length === 0 ? (
          <EmptyState title="No reviews yet" description="Customer reviews will appear here." />
        ) : (
          <>
            <div className="space-y-4">
              {list.map((review) => (
                <div key={review._id} className="flex items-start justify-between border-b border-gray-100 pb-4 last:border-none">
                  <div className="flex gap-3">
                    <img
                      src={review.product?.images?.[0]?.url || 'https://via.placeholder.com/48'}
                      alt={review.product?.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{review.product?.name}</p>
                      <p className="text-sm text-gray-500">
                        by {review.user?.name} &middot; {formatDate(review.createdAt)}
                      </p>
                      <Rating value={review.rating} />
                      {review.title && <p className="mt-1 font-medium text-gray-900">{review.title}</p>}
                      <p className="mt-1 text-sm text-gray-600">{review.comment}</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => setDeleteTarget(review._id)} className="text-gray-400 hover:text-red-600">
                    <FaTrash size={15} />
                  </button>
                </div>
              ))}
            </div>
            <Pagination meta={meta} onPageChange={setPage} />
          </>
        )}
      </div>

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete this review?"
        message="This action cannot be undone."
        isLoading={isDeleting}
      />
    </div>
  );
};

export default ReviewManagePage;
