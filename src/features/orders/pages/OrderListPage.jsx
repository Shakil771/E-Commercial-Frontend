import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBoxOpen } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.js';
import { getMyOrders } from '../orderSlice.js';
import OrderCard from '../components/OrderCard.jsx';
import Pagination from '../../../components/common/Pagination.jsx';
import EmptyState from '../../../components/common/EmptyState.jsx';
import Spinner from '../../../components/common/Spinner.jsx';
import Button from '../../../components/common/Button.jsx';
import usePagination from '../../../hooks/usePagination.js';

const OrderListPage = () => {
  const dispatch = useAppDispatch();
  const { page, setPage } = usePagination();
  const { list, meta, status } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getMyOrders({ page, limit: 10 }));
  }, [dispatch, page]);

  return (
    <div className="container-page py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">My Orders</h1>

      {status === 'loading' && list.length === 0 ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Spinner size="lg" />
        </div>
      ) : list.length === 0 ? (
        <EmptyState
          icon={<FaBoxOpen size={48} />}
          title="No orders yet"
          description="When you place an order, it will show up here."
          action={
            <Link to="/shop">
              <Button>Start Shopping</Button>
            </Link>
          }
        />
      ) : (
        <>
          <div className="space-y-4">
            {list.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
          <Pagination meta={meta} onPageChange={setPage} />
        </>
      )}
    </div>
  );
};

export default OrderListPage;
