import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.js';
import { getProducts, getCategories } from '../productSlice.js';
import ProductList from '../components/ProductList.jsx';
import ProductFilters from '../components/ProductFilters.jsx';
import Pagination from '../../../components/common/Pagination.jsx';

const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { list, meta, status, categories } = useAppSelector((state) => ({
    list: state.products.list,
    meta: state.products.meta,
    status: state.products.status,
    categories: state.products.categories,
  }));

  const filters = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts(filters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, searchParams]);

  const handleFilterChange = (newFilters) => {
    const cleaned = Object.fromEntries(Object.entries(newFilters).filter(([, v]) => v !== '' && v != null));
    setSearchParams(cleaned);
  };

  const handlePageChange = (page) => {
    handleFilterChange({ ...filters, page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container-page py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Shop</h1>
        {filters.search && <p className="mt-1 text-sm text-gray-500">Results for &quot;{filters.search}&quot;</p>}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <aside className="md:col-span-1">
          <ProductFilters categories={categories} filters={filters} onChange={handleFilterChange} />
        </aside>

        <div className="md:col-span-3">
          <ProductList products={list} status={status} />
          <Pagination meta={meta} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
