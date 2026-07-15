import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ className = '' }) => {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(term.trim() ? `/shop?search=${encodeURIComponent(term.trim())}` : '/shop');
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search for products..."
          className="w-full rounded-full border border-gray-300 py-3 pl-5 pr-12 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
        />
        <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900">
          <FaSearch size={16} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
