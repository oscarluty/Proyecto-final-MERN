import React, { useState, useEffect } from 'react';
import { fetchMarcas } from '../api/createProduct';
import { deleteMarca } from "../api/createMarcas";
import { TrashIcon } from '@heroicons/react/24/outline';

const Marcas = () => {
  const [marcas, setMarcas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMarcas = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const marcasData = await fetchMarcas();
      setMarcas(marcasData);
    } catch (error) {
      console.error('Error cargando marcas:', error);
      setError('Hubo un error al cargar las marcas. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMarcas();
  }, []);

  const handleDelete = async (id) => {
    if (!id) {
      console.error('ID de marca no válido');
      return;
    }
    
    if (window.confirm('¿Estás seguro de que quieres eliminar esta marca?')) {
      try {
        await deleteMarca(id);
        setMarcas(marcas.filter(marca => marca._id !== id));
      } catch (error) {
        console.error('Error al eliminar la marca:', error);
        alert('Hubo un error al eliminar la marca. Por favor, inténtalo de nuevo.');
      }
    }
  };

  if (isLoading) return <div className="text-center py-4">Cargando marcas...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Lista de Marcas</h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Creación</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Actualización</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {marcas.map((marca) => (
              <tr key={marca._id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{marca.nombre}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{new Date(marca.createdAt).toLocaleDateString()}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{new Date(marca.updatedAt).toLocaleDateString()}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => handleDelete(marca._id)}
                    className="text-red-600 hover:text-red-900"
                    title="Borrar"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Marcas;