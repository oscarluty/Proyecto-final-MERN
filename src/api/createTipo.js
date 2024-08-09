import { API_URL } from "../config";

export const createTipo = async (tipoData) => {
    try{
        const response = await fetch(`${API_URL}/tipos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tipoData)
        });
        if (!response.ok) {
        throw new Error('Error al crear el tipo');
        }
        return await response.json();
    }catch(error){
    console.log('Error al crear el tipo', error);
    throw error;
    }
}

export const deleteTipo = async (id) => {
    try {
        const response = await fetch(`${API_URL}/tipos/${id}`, {
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