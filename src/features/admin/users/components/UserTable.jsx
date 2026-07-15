import React from 'react';
import Badge from '../../../../components/common/Badge.jsx';
import { formatDate } from '../../../../utils/formatDate.js';
import { useAppDispatch } from '../../../../app/hooks.js';
import { toggleUserStatus, updateUserRole } from '../adminUserSlice.js';
import { showError, showSuccess } from '../../../../components/common/Toast.jsx';

const UserTable = ({ users }) => {
  const dispatch = useAppDispatch();

  const handleToggleStatus = async (id) => {
    const result = await dispatch(toggleUserStatus(id));
    if (toggleUserStatus.fulfilled.match(result)) {
      showSuccess('User status updated');
    } else {
      showError(result.payload || 'Could not update user status');
    }
  };

  const handleRoleChange = async (id, role) => {
    const result = await dispatch(updateUserRole({ id, role }));
    if (updateUserRole.fulfilled.match(result)) {
      showSuccess('User role updated');
    } else {
      showError(result.payload || 'Could not update user role');
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500">
            <th className="py-2 pr-4 font-medium">User</th>
            <th className="py-2 pr-4 font-medium">Joined</th>
            <th className="py-2 pr-4 font-medium">Role</th>
            <th className="py-2 pr-4 font-medium">Status</th>
            <th className="py-2 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b border-gray-100">
              <td className="py-3 pr-4">
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </td>
              <td className="py-3 pr-4 text-gray-500">{formatDate(user.createdAt)}</td>
              <td className="py-3 pr-4">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="rounded-lg border border-gray-300 px-2 py-1 text-xs"
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="py-3 pr-4">
                <Badge className={user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                  {user.isActive ? 'Active' : 'Deactivated'}
                </Badge>
              </td>
              <td className="py-3 text-right">
                <button
                  type="button"
                  onClick={() => handleToggleStatus(user._id)}
                  className="text-xs font-medium text-gray-600 hover:text-gray-900 hover:underline"
                >
                  {user.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
