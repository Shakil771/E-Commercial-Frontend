import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks.js';
import { getAllOrders } from '../adminOrderSlice.js';
import OrderTable from '../components/OrderTable.jsx';
import Pagination from '../../../../components/common/Pagination.jsx';
import Spinner from '../../../../components/common/Spinner.jsx';
import usePagination from '../../../../hooks/usePagination.js';

const STATUS_FILTERS = ['', 'pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];

const OrderManagePage = () => {
  const dispatch = useAppDispatch();
  const { page, setPage } = usePagination();
  const [statusFilter, setStatusFilter] = useState('');
  const { list, meta, status } = useAppSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(getAllOrders({ page, limit: 20, status: statusFilter || undefined }));
  }, [dispatch, page, statusFilter]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Manage Orders</h1>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="input-field w-48"
        >
          {STATUS_FILTERS.map((s) => (
            <option key={s} value={s}>
              {s ? s.charAt(0).toUpperCase() + s.slice(1) : 'All Statuses'}
            </option>
          ))}
        </select>
      </div>

      <div className="card p-6">
        {status === 'loading' ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <OrderTable orders={list} />
            <Pagination meta={meta} onPageChange={setPage} />
          </>
        )}
      </div>
    </div>
  );
};

export default OrderManagePage;
