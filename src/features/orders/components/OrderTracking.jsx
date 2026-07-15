import React from 'react';
import { FaCheckCircle, FaCircle } from 'react-icons/fa';
import { formatDateTime } from '../../../utils/formatDate.js';
import { ORDER_STATUS_LABELS } from '../../../utils/constants.js';

const STAGES = ['pending', 'processing', 'shipped', 'delivered'];

const OrderTracking = ({ order }) => {
  const isCancelledOrRefunded = order.status === 'cancelled' || order.status === 'refunded';
  const currentStageIndex = STAGES.indexOf(order.status);

  if (isCancelledOrRefunded) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
        This order was {order.status}
        {order.cancelReason ? `: ${order.cancelReason}` : '.'}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        {STAGES.map((stage, index) => (
          <React.Fragment key={stage}>
            <div className="flex flex-col items-center gap-2">
              {index <= currentStageIndex ? (
                <FaCheckCircle className="text-green-500" size={22} />
              ) : (
                <FaCircle className="text-gray-300" size={22} />
              )}
              <span className={`text-xs font-medium ${index <= currentStageIndex ? 'text-gray-900' : 'text-gray-400'}`}>
                {ORDER_STATUS_LABELS[stage]}
              </span>
            </div>
            {index < STAGES.length - 1 && (
              <div className={`h-0.5 flex-1 ${index < currentStageIndex ? 'bg-green-500' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {order.trackingNumber && (
        <p className="mt-4 text-sm text-gray-600">
          Tracking Number: <span className="font-semibold">{order.trackingNumber}</span>
        </p>
      )}

      {order.statusHistory?.length > 0 && (
        <div className="mt-6">
          <h4 className="mb-2 text-sm font-semibold text-gray-900">Status History</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            {order.statusHistory
              .slice()
              .reverse()
              .map((entry, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{ORDER_STATUS_LABELS[entry.status] || entry.status}{entry.note ? ` — ${entry.note}` : ''}</span>
                  <span>{formatDateTime(entry.changedAt)}</span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
