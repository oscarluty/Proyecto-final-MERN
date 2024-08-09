import { API_URL } from "../config"

export const createCarrusel = async (carruselData) => {
    try {
        const response = await fetch(API_URL+'/carrusels', {
            method: 'POST',
            body: carruselData,
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.log('Response error text:', errorText);
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
                
        return await response.json();
    } catch (error) {
        console.log('Error al subir la imagen: ', error);
        throw error;
    }
};

export const deleteCarrusel = async (id) => {
    try {
        const response = await fetch(`${API_URL}/carrusels/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return true;
    } catch (error) {
        console.log('Error al borrar el carrusel: ', error);
        throw error;
    }
}