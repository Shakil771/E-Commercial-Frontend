import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks.js';
import { getAdminProducts } from '../adminProductSlice.js';
import ProductTable from '../components/ProductTable.jsx';
import Pagination from '../../../../components/common/Pagination.jsx';
import Spinner from '../../../../components/common/Spinner.jsx';
import Button from '../../../../components/common/Button.jsx';
import usePagination from '../../../../hooks/usePagination.js';

const ProductManagePage = () => {
  const dispatch = useAppDispatch();
  const { page, setPage } = usePagination();
  const { list, meta, status } = useAppSelector((state) => state.adminProducts);

  useEffect(() => {
    dispatch(getAdminProducts({ page, limit: 20 }));
  }, [dispatch, page]);

  return (
    <div> 
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Manage Products</h1>
        <Link to="/admin/products/new">
          <Button>
            <FaPlus size={12} /> Add Product
          </Button>
        </Link>
      </div>

      <div className="card p-6">
        {status === 'loading' ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <ProductTable products={list} />
            <Pagination meta={meta} onPageChange={setPage} />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductManagePage;
