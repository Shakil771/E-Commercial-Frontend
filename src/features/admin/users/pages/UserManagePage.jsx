import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks.js';
import { getAllUsers } from '../adminUserSlice.js';
import UserTable from '../components/UserTable.jsx';
import Pagination from '../../../../components/common/Pagination.jsx';
import Spinner from '../../../../components/common/Spinner.jsx';
import useDebounce from '../../../../hooks/useDebounce.js';
import usePagination from '../../../../hooks/usePagination.js';

const UserManagePage = () => {
  const dispatch = useAppDispatch();
  const { page, setPage } = usePagination();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);
  const { list, meta, status } = useAppSelector((state) => state.adminUsers);

  useEffect(() => {
    dispatch(getAllUsers({ page, limit: 20, search: debouncedSearch || undefined }));
  }, [dispatch, page, debouncedSearch]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field w-64"
        />
      </div>

      <div className="card p-6">
        {status === 'loading' ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <UserTable users={list} />
            <Pagination meta={meta} onPageChange={setPage} />
          </>
        )}
      </div>
    </div>
  );
};

export default UserManagePage;
