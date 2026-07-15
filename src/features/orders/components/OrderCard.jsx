import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../../../components/common/Badge.jsx';
import { formatCurrency } from '../../../utils/formatCurrency.js';
import { formatDate } from '../../../utils/formatDate.js';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../../../utils/constants.js';

const OrderCard = ({ order }) => (
  <Link to={`/orders/${order._id}`} className="card flex flex-col gap-4 p-5 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
    <div>
      <p className="font-semibold text-gray-900">{order.orderNumber}</p>
      <p className="text-sm text-gray-500">Placed on {formatDate(order.createdAt)}</p>
      <p className="mt-1 text-sm text-gray-500">{order.items.length} item(s)</p>
    </div>
    <div className="flex items-center gap-4">
      <Badge className={ORDER_STATUS_COLORS[order.status]}>{ORDER_STATUS_LABELS[order.status]}</Badge>
      <p className="text-lg font-bold text-gray-900">{formatCurrency(order.totalPrice)}</p>
    </div>
  </Link>
);

export default OrderCard;
