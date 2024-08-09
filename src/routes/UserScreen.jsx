import React, { useState, useEffect } from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Asumiendo que tienes estas funciones en tus archivos de API
import { fetchUsers } from '../fetch/fetchUsers';
import { fetchRoles } from "../fetch/fetchRoles";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const [usersData, rolesData] = await Promise.all([
        fetchUsers(),
        fetchRoles()
      ]);
      setUsers(usersData);
      setFilteredUsers(usersData);
      setRoles(rolesData);
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);



  const getRolNombre = (rolId) => {
    const rol = roles.find(r => r._id === rolId);
    return rol ? rol.rol : 'Desconocido';
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
    filterUsers(searchTerm);
  };

  const filterUsers = (searchTerm) => {
    const filtered = users.filter((user) => {
      return (
        user.nombre.toLowerCase().includes(searchTerm) ||
        user.apellido.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.telefono.toString().includes(searchTerm)
      );
    });
    setFilteredUsers(filtered);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Lista de Usuarios</h2>
      <Link to='/registrar-usuario'><p className="text-sky-600 italic">Registrar nuevo usuario</p></Link>
      
      <div className="mb-4">
        <input 
          type="text" 
          value={search} 
          onChange={handleSearch} 
          placeholder="Buscar usuarios por nombre, apellido, email o teléfono" 
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.nombre}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.apellido}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.telefono}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{getRolNombre(user.rol)}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;