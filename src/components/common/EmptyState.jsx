import React from 'react';

const EmptyState = ({ icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 py-16 text-center">
    {icon && <div className="mb-4 text-gray-300">{icon}</div>}
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    {description && <p className="mt-1 max-w-sm text-sm text-gray-500">{description}</p>}
    {action && <div className="mt-6">{action}</div>}
  </div>
);

export default EmptyState;
