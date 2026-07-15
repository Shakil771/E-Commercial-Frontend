import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks.js';
import { getAdminOrderDetails } from '../adminOrderSlice.js';
import OrderDetails from '../../../orders/components/OrderDetails.jsx';
import OrderStatusUpdater from '../components/OrderStatusUpdater.jsx';
import Spinner from '../../../../components/common/Spinner.jsx';

const AdminOrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { current: order, status } = useAppSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(getAdminOrderDetails(id));
  }, [dispatch, id]);

  if (status === 'loading' || !order) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <OrderDetails order={order} />
      </div>
      <div className="card h-fit p-6">
        <h3 className="mb-4 text-lg font-bold text-gray-900">Manage Status</h3>
        <OrderStatusUpdater order={order} />
      </div>
    </div>
  );
};

export default AdminOrderDetailsPage;
