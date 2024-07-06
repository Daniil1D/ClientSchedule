import React, { useState, useEffect } from 'react';
import { useGetAllUsersQuery, useDeleteUserMutation } from '../../app/services/userApi';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const AllUser = () => {
  const { data: users, error, isLoading, refetch } = useGetAllUsersQuery(); // Добавляем refetch здесь
  const [searchTerm, setSearchTerm] = useState('');
  const [updatedUserData, setUpdatedUserData] = useState<any>({});
  const sortedUsers = users ? [...users] : [];
  const [deleteUserMutation] = useDeleteUserMutation(); // Mutation hook для удаления пользователя

  const navigate = useNavigate();

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUserMutation(userId); // Вызываем мутацию для удаления пользователя
      // После успешного удаления перезагружаем данные пользователей
      refetch();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUser = (userId: string) => {
    navigate(`/editUsers/${userId}`); // Переход на страницу редактирования пользователя
  };

  // Применение фильтрации по имени, email, роли и классу
  const filteredUsers = sortedUsers.filter(user => {
    if (!user) return false; // Handle cases where user might be null or undefined
  
    const nameMatch = user.name && typeof user.name === 'string' && user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const emailMatch = user.email && typeof user.email === 'string' && user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const classMatch = user.class && typeof user.class === 'string' && user.class.toLowerCase().includes(searchTerm.toLowerCase());
  
    return nameMatch || emailMatch || classMatch;
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching users:</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">All Users</h1>
      <div className="mb-4">
        {/* Фильтр поиска */}
        <input
          type="text"
          placeholder="Enter name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead className="bg-gray-800 text-white dark:bg-gray-900">
          <tr>
            <th className="w-1/4 px-4 py-2">Class</th>
            <th className="w-1/4 px-4 py-2">Name</th>
            <th className="w-1/4 px-4 py-2">Email</th>
            <th className="w-1/4 px-4 py-2">Role</th>
            <th className="w-1/4 px-4 py-2">Actions</th> {/* Добавлен столбец для действий */}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id} className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
              <td className="border px-4 py-2 dark:border-gray-600 dark:text-white">{user.class}</td>
              <td className="border px-4 py-2 dark:border-gray-600 dark:text-white">{user.name || 'N/A'}</td>
              <td className="border px-4 py-2 dark:border-gray-600 dark:text-white">{user.email || 'N/A'}</td>
              <td className="border px-4 py-2 dark:border-gray-600 dark:text-white">{user.roleId}</td>
              <td className="border px-4 py-2 dark:border-gray-600 dark:text-white">
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
