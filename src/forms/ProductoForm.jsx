import React, { useState, useEffect } from 'react'

const ProductoForm = () => {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [marca, setMarca] = useState('')
  const [subcategoria, setSubcategoria] = useState('')
  const [marcas, setMarcas] = useState([])
  const [subcategorias, setSubcategorias] = useState([])

  useEffect(() => {
    // Aquí deberías cargar las marcas y subcategorías de tu base de datos
    setMarcas(['Marca 1', 'Marca 2', 'Marca 3'])
    setSubcategorias(['Subcategoría 1', 'Subcategoría 2', 'Subcategoría 3'])
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ nombre, descripcion, marca, subcategoria })
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Registro de Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción:</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="marca" className="block text-sm font-medium text-gray-700">Marca:</label>
          <select
            id="marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Seleccione una marca</option>
            {marcas.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="subcategoria" className="block text-sm font-medium text-gray-700">Subcategoría:</label>
          <select
            id="subcategoria"
            value={subcategoria}
            onChange={(e) => setSubcategoria(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Seleccione una subcategoría</option>
            {subcategorias.map((s) => (
              <option key={s} value={s}>{s}</option>
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