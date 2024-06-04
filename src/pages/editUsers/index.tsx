import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../../app/services/userApi';
import { useGetAllRolesQuery } from '../../app/services/roleApi'; 
import { useGetAllClassesQuery } from '../../app/services/classesApi'; 
import { GoBack } from "../../components/go-back";
import { User } from '../../app/types';

export const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: user, error, isLoading } = useGetUserByIdQuery(id || '');
  const [updateUser, { isLoading: isUpdating, isError }] = useUpdateUserMutation();
  const { data: classes = [] } = useGetAllClassesQuery();
  const { data: roles = [] } = useGetAllRolesQuery();

  const [updatedUserData, setUpdatedUserData] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      setUpdatedUserData(user);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevData) => (prevData ? { ...prevData, [name]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!updatedUserData || !id) return;

    try {
      const formData = new FormData();
      formData.append('email', updatedUserData.email);
      formData.append('name', updatedUserData.name || '');
      formData.append('class', updatedUserData.class || '');
      formData.append('roleId', updatedUserData.roleId.toString());

      await updateUser({ userData: formData, id }).unwrap();
      navigate('/allUsers'); // Переход на страницу со списком пользователей после успешного обновления
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching user</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <GoBack />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold">Name:</label>
          <input type="text" id="name" name="name" value={updatedUserData?.name || ''} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold">Email:</label>
          <input type="email" id="email" name="email" value={updatedUserData?.email || ''} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="roleId" className="block text-sm font-semibold">Role:</label>
          <select id="roleId" name="roleId" value={updatedUserData?.roleId} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full">
            {roles.map((role) => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="class" className="block text-sm font-semibold">Class:</label>
          <select id="class" name="class" value={updatedUserData?.class} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full">
          <option value="" disabled>Выберите нужный класс</option>
            {classes.map((classItem) => (
              <option key={classItem.id} value={classItem.name}>{classItem.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={isUpdating} className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
        {isError && <div>Error updating user</div>}
      </form>
    </div>
  );
};
