import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.js';
import { getOrderDetails } from '../orderSlice.js';
import OrderDetails from '../components/OrderDetails.jsx';
import Spinner from '../../../components/common/Spinner.jsx';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { current: order, status } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  if (status === 'loading' || !order) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container-page max-w-4xl py-8">
      <OrderDetails order={order} />
    </div>
  );
};

export default OrderDetailsPage;
