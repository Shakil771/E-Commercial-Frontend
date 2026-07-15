import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../../../utils/formatCurrency.js';

const SalesChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="py-12 text-center text-sm text-gray-400">No sales data for this period yet.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="_id" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip formatter={(value) => formatCurrency(value)} />
        <Line type="monotone" dataKey="totalSales" stroke="#111827" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;
