import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { createProduct, fetchCategorias, fetchMarcas, fetchTipos, updateProduct } from '../api/createProduct'
import eventEmitter from '../api/eventEmitter';

const ProductoForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editingProduct = location.state?.editingProduct;

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    imagen: null,
    marca: '',
    categoria: '',
    tipo: ''
  })
  const [previewImage, setPreviewImage] = useState(null)
  const [marcas, setMarcas] = useState([])
  const [categorias, setCategorias] = useState([])
  const [tipos, setTipos] = useState([])
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        nombre: editingProduct.nombre,
        descripcion: editingProduct.descripcion,
        imagen: null,
        marca: editingProduct.marca,
        categoria: editingProduct.categoria,
        tipo: editingProduct.tipo
      });
      setPreviewImage(editingProduct.imagen);
    }
    else {
      setFormData({
        nombre: '',
        descripcion: '',
        imagen: null,
        marca: '',
        categoria: '',
        tipo: ''
      });
      setPreviewImage(null);
    }

    const loadMarcasCategoriasYTipos = async () => {
      try {
        const [marcasData, categoriasData, tiposData] = await Promise.all([
          fetchMarcas(),
          fetchCategorias(),
          fetchTipos()
        ]);
        setMarcas(marcasData);
        setCategorias(categoriasData);
        setTipos(tiposData);
      } catch (err) {
        setError('Error al cargar marcas, categorías y tipos: ' + err.message);
      }
    };

    loadMarcasCategoriasYTipos();

    const handleNewMarca = (newMarca) => {
      setMarcas(prevMarcas => [...prevMarcas, newMarca]);
    };

    const handleNewCategoria = (newCategoria) => {
      setCategorias(prevCategorias => [...prevCategorias, newCategoria]);
    };

    const handleNewTipo = (newTipo) => {
      setTipos(prevTipos => [...prevTipos, newTipo]);
    };

    eventEmitter.subscribe('newMarca', handleNewMarca);
    eventEmitter.subscribe('newCategoria', handleNewCategoria);
    eventEmitter.subscribe('newTipo', handleNewTipo);

    return () => {
      eventEmitter.unsubscribe('newMarca', handleNewMarca);
      eventEmitter.unsubscribe('newCategoria', handleNewCategoria);
      eventEmitter.unsubscribe('newTipo', handleNewTipo);
    }

  }, [editingProduct])

  const handleChange = (e) => {
    if (e.target.name === 'imagen') {
      const file = e.target.files[0];
      setFormData({ ...formData, imagen: file });

      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      }
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nombre', formData.nombre);
      formDataToSend.append('descripcion', formData.descripcion);
      formDataToSend.append('marca', formData.marca);
      formDataToSend.append('categoria', formData.categoria);
      formDataToSend.append('tipo', formData.tipo);
      if (formData.imagen) {
        formDataToSend.append('imagen', formData.imagen);
      }

      let result;
      if (editingProduct) {
        result = await updateProduct(editingProduct._id, formDataToSend);
        console.log('Producto actualizado:', result);
      } else {
        result = await createProduct(formDataToSend);
        console.log('Producto creado:', result);
      }

      setSuccess(true);
      setFormData({
        nombre: '',
        descripcion: '',
        imagen: null,
        marca: '',
        categoria: '',
        tipo: ''
      });
      setPreviewImage(null);

      setTimeout(() => {
        navigate('/mantenimiento');
      }, 1000);
    } catch (err) {
      setError(`Error al ${editingProduct ? 'actualizar' : 'crear'} el producto: ` + err.message);
    }
  };

  return (
    <div className="bg-slate-200 p-4 max-w-md mx-auto mt-10 rounded-lg">
      <h2 className="text-2xl font-bold mb-5">{editingProduct ? 'Editar' : 'Registro de'} Producto</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">Producto {editingProduct ? 'actualizado' : 'creado'} con éxito!</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="imagen" className="block text-sm font-medium text-gray-700">URL de la imagen:</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            onChange={handleChange}
            accept="image/*"
            className="mt-1 block w-full"
          />
        </div>
        {previewImage && (
          <div>
            <img src={previewImage} alt="Vista previa" className="mt-2 max-w-full h-auto" />
          </div>
        )}
        <div>
          <label htmlFor="marca" className="block text-sm font-medium text-gray-700">Marca:</label>
          <select
            id="marca"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Seleccione una marca</option>
            {marcas.map((m) => (
              <option key={m._id} value={m._id}>{m.nombre}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoría:</label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((c) => (
              <option key={c._id} value={c._id}>{c.nombre}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo:</label>
          <select
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Seleccione un tipo</option>
            {tipos.map((t) => (
              <option key={t._id} value={t._id}>{t.nombre}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {editingProduct ? 'Actualizar' : 'Registrar'} Producto
        </button>
      </form>
    </div>
  );
};

export default ProductoForm