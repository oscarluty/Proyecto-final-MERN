import React, { useState, useEffect } from 'react';

// Assuming you have this function in your API file
import { fetchContactos } from '../api/createProduct';

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredMessages, setFilteredMessages] = useState([]);

  const loadData = async () => {
    try {
      const messagesData = await fetchContactos();
      setMessages(messagesData);
      setFilteredMessages(messagesData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
    filterMessages(searchTerm);
  };

  const filterMessages = (searchTerm) => {
    const filtered = messages.filter((message) => {
      return (
        message.nombre.toLowerCase().includes(searchTerm) ||
        message.email.toLowerCase().includes(searchTerm) ||
        message.mensaje.toLowerCase().includes(searchTerm) 
      );
    });
    setFilteredMessages(filtered);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Lista de Mensajes</h2>
      
      <div className="mb-4">
        <input 
          type="text" 
          value={search} 
          onChange={handleSearch} 
          placeholder="Buscar mensajes por nombre, email o contenido" 
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mensaje</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMessages.map((message) => (
              <tr key={message._id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{message.nombre}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{message.email}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{message.mensaje}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{new Date(message.createdAt).toLocaleString()}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessageList;