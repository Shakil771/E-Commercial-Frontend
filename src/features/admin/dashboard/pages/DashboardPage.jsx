import React, { useEffect } from 'react';
import { FaUsers, FaBoxOpen, FaClipboardList, FaDollarSign, FaExclamationTriangle, FaStar } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks.js';
import { getDashboardStats, getSalesChart, getTopProducts } from '../dashboardSlice.js';
import { getAllOrders } from '../../orders/adminOrderSlice.js';
import StatsCard from '../components/StatsCard.jsx';
import SalesChart from '../components/SalesChart.jsx';
import RecentOrdersTable from '../components/RecentOrdersTable.jsx';
import Spinner from '../../../../components/common/Spinner.jsx';
import { formatCurrency } from '../../../../utils/formatCurrency.js';

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { stats, salesData, topProducts, status } = useAppSelector((state) => state.dashboard);
  const { list: orders } = useAppSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(getDashboardStats());
    dispatch(getSalesChart(30));
    dispatch(getTopProducts(5));
    dispatch(getAllOrders({ limit: 5, page: 1 }));
  }, [dispatch]);

  if (status === 'loading' && !stats) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Dashboard</h1>

      {stats && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <StatsCard icon={FaDollarSign} label="Revenue" value={formatCurrency(stats.totalRevenue)} accent="bg-green-50 text-green-600" />
          <StatsCard icon={FaClipboardList} label="Orders" value={stats.totalOrders} />
          <StatsCard icon={FaBoxOpen} label="Products" value={stats.totalProducts} accent="bg-blue-50 text-blue-600" />
          <StatsCard icon={FaUsers} label="Customers" value={stats.totalUsers} accent="bg-purple-50 text-purple-600" />
          <StatsCard icon={FaExclamationTriangle} label="Pending Orders" value={stats.pendingOrders} accent="bg-yellow-50 text-yellow-600" />
          <StatsCard icon={FaStar} label="Low Stock Items" value={stats.lowStockProducts} accent="bg-red-50 text-red-600" />
        </div>
      )}

      <div className="mt-8 card p-6">
        <h2 className="mb-4 text-lg font-bold text-gray-900">Sales — Last 30 Days</h2>
        <SalesChart data={salesData} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <h2 className="mb-4 text-lg font-bold text-gray-900">Recent Orders</h2>
          <RecentOrdersTable orders={orders} />
        </div>

        <div className="card p-6">
          <h2 className="mb-4 text-lg font-bold text-gray-900">Top Selling Products</h2>
          <div className="space-y-3">
            {topProducts.map((product) => (
              <div key={product._id} className="flex items-center gap-3">
                <img src={product.image} alt={product.name} className="h-10 w-10 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.totalSold} sold</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">{formatCurrency(product.totalRevenue)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
