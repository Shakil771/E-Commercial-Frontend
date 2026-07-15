import React, { useState } from 'react';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Top Rated' },
  { value: 'popular', label: 'Most Popular' },
];

const ProductFilters = ({ categories, filters, onChange }) => {
  const [priceRange, setPriceRange] = useState({
    minPrice: filters.minPrice || '',
    maxPrice: filters.maxPrice || '',
  });

  const handleCategoryClick = (categoryId) => {
    onChange({ ...filters, category: filters.category === categoryId ? '' : categoryId, page: 1 });
  };

  const handlePriceSubmit = (e) => {
    e.preventDefault();
    onChange({ ...filters, ...priceRange, page: 1 });
  };

  const handleSortChange = (e) => {
    onChange({ ...filters, sort: e.target.value, page: 1 });
  };

  const handleInStockToggle = () => {
    onChange({ ...filters, inStock: filters.inStock === 'true' ? '' : 'true', page: 1 });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="label-text" htmlFor="sort-select">Sort by</label>
        <select id="sort-select" value={filters.sort || 'newest'} onChange={handleSortChange} className="input-field">
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-gray-900">Category</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat._id}
              type="button"
              onClick={() => handleCategoryClick(cat._id)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${
                filters.category === cat._id ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handlePriceSubmit}>
        <h4 className="mb-3 text-sm font-semibold text-gray-900">Price Range</h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            placeholder="Min"
            value={priceRange.minPrice}
            onChange={(e) => setPriceRange((prev) => ({ ...prev, minPrice: e.target.value }))}
            className="input-field"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            min="0"
            placeholder="Max"
            value={priceRange.maxPrice}
            onChange={(e) => setPriceRange((prev) => ({ ...prev, maxPrice: e.target.value }))}
            className="input-field"
          />
        </div>
        <button type="submit" className="btn-secondary mt-3 w-full">
          Apply
        </button>
      </form>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" checked={filters.inStock === 'true'} onChange={handleInStockToggle} className="h-4 w-4 rounded border-gray-300" />
        In stock only
      </label>
    </div>
  );
};

export default ProductFilters;
