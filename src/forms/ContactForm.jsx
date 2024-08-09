import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createContacto } from '../api/createContacto';
import eventEmitter from '../api/eventEmitter';

export const ContactForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data) => {
    setError(null);
    setSuccess(false);
    try {
        console.log('Datos que se envían:', data); // Verifica los datos que se están enviando
        const newContacto = await createContacto(data);
        console.log('Respuesta de la API:', newContacto); // Verifica la respuesta de la API
        setSuccess(true);
        reset();
        eventEmitter.dispatch('newContacto', newContacto);
    } catch (err) {
        console.log('Error en la solicitud:', err);
        setError('Error al crear el contacto: ' + err.message);
    }
};

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-5">Formulario de Contacto</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">¡Contacto creado con éxito!</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nombre:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nombre"
            type="text"
            placeholder="Tu nombre"
            {...register("nombre", { required: "Este campo es requerido" })}
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="tu@email.com"
            {...register("email", { 
              required: "Este campo es requerido", 
              pattern: { 
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                message: "Email inválido" 
              } 
            })}
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
            Mensaje:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            id="mensaje"
            placeholder="Tu mensaje"
            {...register("mensaje", { required: "Este campo es requerido" })}
          />
          {errors.message && <p className="text-red-500 text-xs italic">{errors.message.message}</p>}
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};
