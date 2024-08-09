import React, { useState } from 'react';
import { createCarrusel } from '../api/createCarrusel';
import eventEmitter from '../api/eventEmitter';

const CarruselForm = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Crear URL para vista previa
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    }
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Por favor selecciona una imagen');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('imagen', file);

      console.log('File object:', file);
      console.log('FormData content: ', [...formData.entries()]);

      const result = await createCarrusel(formData);
      setMessage('Imagen subida exitosamente');
      eventEmitter.dispatch('newImageUploaded', result);
      setFile(null);
      setPreviewImage(null);
      // Reinicia el input de archivo
      e.target.reset();
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error al subir la imagen. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Subir Nueva Imagen al Carrusel</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="imagen" className="block text-sm font-medium text-gray-700">
            Seleccionar Imagen
          </label>
          <input
            type="file"
            id="imagen"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
          />
        </div>
        {previewImage && (
          <div>
            <img src={previewImage} alt="Vista previa" className="mt-2 max-w-full h-auto" />
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {loading ? 'Subiendo...' : 'Subir Imagen'}
        </button>
      </form>
      {message && (
        <p className={`mt-4 text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default CarruselForm;