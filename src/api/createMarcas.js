import { API_URL } from "../config";

export const createMarca = async (marcaData) => {
    try {
        const response = await fetch(`${API_URL}/marcas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(marcaData)
        });

        if (!response.ok) {
            throw new Error('Error al crear la marca');
        }
        return await response.json();
    } catch (error) {
        console.log('Error al crear la marca', error);
        throw error;
    }
}

export const deleteMarca = async (id) => {
    try {
        const response = await fetch(`${API_URL}/marcas/${id}`, {
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