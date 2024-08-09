
import { API_URL } from "../config";

export const createProduct = async (productData) => {
    try {
      const response = await fetch(API_URL+'/products', {
        method: 'POST',
        body: productData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        console.log(productData)
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  };

  export const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return true; // El servidor devuelve 204 No Content en caso de éxito
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  export const updateProduct = async (id, productData) => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        body: productData
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error updating product:', error);
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

  export const fetchTipos = async () => {
    try {
      const response = await fetch(API_URL+'/tipos');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching tipos:', error);
      throw error;
    }
  }

  export const fetchContactos = async () => {
    try {
      const response = await fetch(API_URL+'/contactos');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching contactos:', error);
      throw error;
    }
  }
