import React, { useState, useEffect } from 'react';
import { fetchCarrusel } from '../fetch/fetchCarrusel';
import { TrashIcon } from '@heroicons/react/24/solid';
import { deleteCarrusel } from '../api/createCarrusel';
import eventEmitter from '../api/eventEmitter';


const VistaPreviaCarrusel = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const loadImages = async () => {
      try {
        const carruselData = await fetchCarrusel();
        setImages(carruselData);
        setLoading(false);
      } catch (err) {
        console.error('Error loading carrusel images:', err);
        setError('Failed to load images. Please try again later.');
        setLoading(false);
      }
    };
  
    useEffect(() => {
      loadImages();
      const handleNewImage = (newImage) => {
        setImages(prevImages => [...prevImages, newImage]);
      };
  
      eventEmitter.subscribe('newImageUploaded', handleNewImage);
  
      return () => {
        eventEmitter.unsubscribe('newImageUploaded', handleNewImage);
      };  
    }, []);
  
    const handleDelete = async (id) => {
      try {
        await deleteCarrusel(id);
        // Actualizar el estado local para reflejar la eliminación
        setImages(images.filter(img => img._id !== id));
      } catch (err) {
        console.error('Error deleting image:', err);
        setError('Failed to delete image. Please try again.');
      }
    };
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
  
    return (
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Vista Previa del Carrusel</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden group relative">
              <img 
                src={item.imagen} 
                alt={`Carrusel image ${item._id}`} 
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                >
                  <TrashIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600">ID: {item._id}</p>
                <p className="text-sm text-gray-600">
                  Creado: {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default VistaPreviaCarrusel;