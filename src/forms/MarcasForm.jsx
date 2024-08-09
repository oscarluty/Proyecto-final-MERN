import React, { useState } from 'react'
import { createMarca } from "../api/createMarcas";
import eventEmitter from '../api/eventEmitter';

const MarcasForm = () => {
  const [formData, setFormData] = useState({
    nombre: ''
  })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    try {
      const newMarca = await createMarca(formData)
      console.log('Marca creada:', newMarca)
      setSuccess(true)
      setFormData({ nombre: '' })
      eventEmitter.dispatch('newMarca', newMarca)
    } catch (err) {
      setError('Error al crear la marca: ' + err.message)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-slate-200 p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Registro de Marca</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">Marca creada con éxito!</p>}
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
        <button 
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Registrar Marca
        </button>
      </form>
    </div>
  )
}

export default MarcasForm