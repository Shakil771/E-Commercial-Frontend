import React from 'react';

const Pagination = ({ meta, onPageChange }) => {
  if (!meta || meta.totalPages <= 1) return null;

  const { currentPage, totalPages, hasPrevPage, hasNextPage } = meta;

  const pages = [];
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  for (let i = startPage; i <= endPage; i += 1) {
    pages.push(i);
  }

  return (
    <nav className="mt-8 flex items-center justify-center gap-1">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevPage}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Prev
      </button>

      {startPage > 1 && (
        <>
          <button type="button" onClick={() => onPageChange(1)} className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
            1
          </button>
          {startPage > 2 && <span className="px-1 text-gray-400">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`rounded-lg px-3 py-2 text-sm font-medium ${
            page === currentPage ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-1 text-gray-400">...</span>}
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
