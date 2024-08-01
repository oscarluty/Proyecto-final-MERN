// api.js

import { API_URL } from "../config";

export const createProduct = async (productData) => {
    try {
      const response = await fetch('http://localhost:4000/api/products', {
        method: 'POST',
        body: productData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  };

  export const fetchMarcas = async () => {
    try {
      const response = await fetch(API_URL+'/marcas');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching marcas:', error);
      throw error;
    }
  };
  
  export const fetchCategorias = async () => {
    try {
      const response = await fetch(API_URL+'/categorias');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching categorias:', error);
      throw error;
    }
  };