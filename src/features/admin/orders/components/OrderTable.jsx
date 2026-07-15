import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../../../../components/common/Badge.jsx';
import { formatCurrency } from '../../../../utils/formatCurrency.js';
import { formatDate } from '../../../../utils/formatDate.js';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../../../../utils/constants.js';

const OrderTable = ({ orders }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b border-gray-200 text-gray-500">
          <th className="py-2 pr-4 font-medium">Order</th>
          <th className="py-2 pr-4 font-medium">Customer</th>
          <th className="py-2 pr-4 font-medium">Date</th>
          <th className="py-2 pr-4 font-medium">Payment</th>
          <th className="py-2 pr-4 font-medium">Status</th>
          <th className="py-2 text-right font-medium">Total</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id} className="border-b border-gray-100">
            <td className="py-3 pr-4">
              <Link to={`/admin/orders/${order._id}`} className="font-medium text-gray-900 hover:underline">
                {order.orderNumber}
              </Link>
            </td>
            <td className="py-3 pr-4 text-gray-600">
              {order.user?.name}
              <br />
              <span className="text-xs text-gray-400">{order.user?.email}</span>
            </td>
            <td className="py-3 pr-4 text-gray-500">{formatDate(order.createdAt)}</td>
            <td className="py-3 pr-4 capitalize text-gray-600">{order.paymentStatus}</td>
            <td className="py-3 pr-4">
              <Badge className={ORDER_STATUS_COLORS[order.status]}>{ORDER_STATUS_LABELS[order.status]}</Badge>
            </td>
            <td className="py-3 text-right font-semibold text-gray-900">{formatCurrency(order.totalPrice)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default OrderTable;
