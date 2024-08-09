import React, { useState, useEffect } from 'react';
import { fetchCategorias, fetchMarcas, deleteProduct } from '../api/createProduct';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { fetchProducts } from '../fetch/fetchProduct';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const [productsData, marcasData, categoriasData] = await Promise.all([
        fetchProducts(),
        fetchMarcas(),
        fetchCategorias()
      ]);
      setProducts(productsData);
      setFilteredProducts(productsData);
      setMarcas(marcasData);
      setCategorias(categoriasData);
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEdit = (product) => {
    navigate('/registros', { state: { editingProduct: product } });
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(product => product._id !== id));
        setFilteredProducts(filteredProducts.filter(product => product._id !== id));
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
        alert('Hubo un error al eliminar el producto. Por favor, inténtalo de nuevo.');
      }
    }
  };

  const getMarcaNombre = (marcaId) => {
    const marca = marcas.find(m => m._id === marcaId);
    return marca ? marca.nombre : 'Desconocida';
  };

  const getCategoriaNombre = (categoriaId) => {
    const categoria = categorias.find(c => c._id === categoriaId);
    return categoria ? categoria.nombre : 'Desconocida';
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
    filterProducts(searchTerm);
  };

  const filterProducts = (searchTerm) => {
    const filtered = products.filter((product) => {
      const marcaNombre = getMarcaNombre(product.marca).toLowerCase();
      const categoriaNombre = getCategoriaNombre(product.categoria).toLowerCase();
      return (
        product.nombre.toLowerCase().includes(searchTerm) ||
        product.descripcion.toLowerCase().includes(searchTerm) ||
        marcaNombre.includes(searchTerm) ||
        categoriaNombre.includes(searchTerm)
      );
    });
    setFilteredProducts(filtered);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Lista de Productos</h2>
      <Link to='/registros'><p className="text-sky-600 italic">Registrar nuevo producto</p></Link>
      
      <div className="mb-4">
        <input 
          type="text" 
          value={search} 
          onChange={handleSearch} 
          placeholder="Buscar productos por nombre, descripción, marca o categoría" 
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marca</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <img 
                    src={product.imagen} 
                    alt={product.nombre} 
                    className="h-16 w-16 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{product.nombre}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{product.descripcion}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{getMarcaNombre(product.marca)}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{getCategoriaNombre(product.categoria)}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => handleEdit(product)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                    title="Editar"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(product._id)}
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

export default ProductList;