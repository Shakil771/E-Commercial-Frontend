import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value = 0, count, size = 14 }) => {
  const stars = [];
  for (let i = 1; i <= 5; i += 1) {
    if (value >= i) stars.push(<FaStar key={i} size={size} className="text-amber-400" />);
    else if (value >= i - 0.5) stars.push(<FaStarHalfAlt key={i} size={size} className="text-amber-400" />);
    else stars.push(<FaRegStar key={i} size={size} className="text-amber-400" />);
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">{stars}</div>
      {count !== undefined && <span className="text-xs text-gray-500">({count})</span>}
    </div>
  );
};

export default Rating;
