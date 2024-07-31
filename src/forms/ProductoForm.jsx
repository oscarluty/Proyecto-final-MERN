import React, { useState, useEffect } from 'react'
import { createProduct, fetchCategorias, fetchMarcas } from '../api/createProduct'

const ProductoForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    imagen: null,
    marca: '',
    categoria: ''
  })
  const [previewImage, setPreviewImage] = useState(null)
  const [marcas, setMarcas] = useState([])
  const [categorias, setCategorias] = useState([])
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const loadMarcasYCategorias = async () => {
      try {
        const [marcasData, categoriasData] = await Promise.all([
          fetchMarcas(),
          fetchCategorias()
        ]);
        setMarcas(marcasData);
        setCategorias(categoriasData);
      } catch (err) {
        setError('Error al cargar marcas y categorías: ' + err.message);
      }
    };

    loadMarcasYCategorias();
  }, [])

  const handleChange = (e) => {
    if (e.target.name === 'imagen') {
      const file = e.target.files[0];
      setFormData({...formData, imagen: file});

      // Crear URL para vista previa
      const reader = new FileReader();
      reader.onloaded = () => {
        setPreviewImage(reader.result);
      }
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      
      const newProduct = await createProduct(formDataToSend)
      console.log('Producto creado:', newProduct)
      setSuccess(true)
      setFormData({
        nombre: '',
        descripcion: '',
        imagen: null,
        marca: '',
        categoria: ''
      })
      setPreviewImage(null)
    } catch (err) {
      setError('Error al crear el producto: ' + err.message)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Registro de Producto</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">Producto creado con éxito!</p>}
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
        <button 
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Registrar Producto
        </button>
      </form>
    </div>
  )
}

export default ProductoForm