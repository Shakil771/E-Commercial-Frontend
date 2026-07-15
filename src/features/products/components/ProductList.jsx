import React from 'react';
import ProductCard from './ProductCard.jsx';
import EmptyState from '../../../components/common/EmptyState.jsx';
import Spinner from '../../../components/common/Spinner.jsx';
import { FaBoxOpen } from 'react-icons/fa';

const ProductList = ({ products, status }) => {
  if (status === 'loading') {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        icon={<FaBoxOpen size={48} />}
        title="No products found"
        description="Try adjusting your filters or search terms."
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
