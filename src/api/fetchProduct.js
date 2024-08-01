import { API_URL } from "../config";

export const fetchProducts = async () => {
  try {
    const response = await fetch(API_URL+'/products');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    if (error instanceof TypeError && error.message.includes('CORS')) {
      console.log('CORS error detectado. Por favor checkear configuracion CORS en el servidor');
    }
    throw error;
  }
};