import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UserScreen = () => {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [filteredUsers, setFilteredUsers] = useState([])

  const URL = 'http://localhost:4000/api/auth/users'

  // Mapeo de IDs de roles a nombres
  const roleMap = {
    '668366f031d497510845d8cc': 'admin',
    '6683672431d497510845d8cd': 'cliente'
  }

  const fetchUsers = async () => {
    try {
      const response = await axios.get(URL)
      setUsers(response.data)
      setFilteredUsers(response.data)
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase()
    setSearch(searchTerm)
    filterUsers(searchTerm, roleFilter)
  }

  const handleRoleFilter = (e) => {
    const role = e.target.value
    setRoleFilter(role)
    filterUsers(search, role)
  }

  const filterUsers = (searchTerm, role) => {
    const filtered = users.filter((user) => {
      const matchesSearch = 
        user.nombre?.toLowerCase().includes(searchTerm) ||
        user.apellido?.toLowerCase().includes(searchTerm)
      
      const userRoleName = roleMap[user.rol] || 'unknown'
      const matchesRole = role === 'all' || userRoleName === role

      return matchesSearch && matchesRole
    })
    setFilteredUsers(filtered)
  }

  const getRoleName = (roleId) => {
    return roleMap[roleId] || 'Unknown Role'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <div className="flex mb-6 space-x-4">
        <input 
          type="text" 
          value={search} 
          onChange={handleSearch} 
          placeholder="Search users" 
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select 
          value={roleFilter} 
          onChange={handleRoleFilter}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="cliente">Cliente</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{user.nombre || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.apellido || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.telefono || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getRoleName(user.rol)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserScreen