import React from 'react';

const StatsCard = ({ icon: Icon, label, value, accent = 'bg-primary-50 text-primary-600' }) => (
  <div className="card flex items-center gap-4 p-5">
    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${accent}`}>
      <Icon size={22} />
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export default StatsCard;
