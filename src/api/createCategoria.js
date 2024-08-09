import { API_URL } from "../config";

export const createCategoria = async (categoriaData) => {
    try {
        const response = await fetch(`${API_URL}/categorias`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(categoriaData),
        });

        if (!response.ok) {
            throw new Error(`Error creating categoria: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.log('error creating categoria');
        throw error;
    }
}

export const deleteCategoria = async (id) => {
    try {
        const response = await fetch(`${API_URL}/categorias/${id}`, {
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