import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.js';
import { getWishlist } from '../wishlistSlice.js';
import WishlistItem from '../components/WishlistItem.jsx';
import EmptyState from '../../../components/common/EmptyState.jsx';
import Spinner from '../../../components/common/Spinner.jsx';
import Button from '../../../components/common/Button.jsx';

const WishlistPage = () => {
  const dispatch = useAppDispatch();
  const { wishlist, status } = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  return (
    <div className="container-page py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">My Wishlist</h1>

      {status === 'loading' ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Spinner size="lg" />
        </div>
      ) : wishlist.products.length === 0 ? (
        <EmptyState
          icon={<FaHeart size={48} />}
          title="Your wishlist is empty"
          description="Save products you love to buy them later."
          action={
            <Link to="/shop">
              <Button>Browse Products</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {wishlist.products.map((product) => (
            <WishlistItem key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
