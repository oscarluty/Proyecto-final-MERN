import { API_URL } from "../config"

export const createCarrusel = async (carruselData) => {
    try {
        const response = await fetch(API_URL+'/carrusels', {
            method: 'POST',
            body: carruselData,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
                
        return await response.json();
    } catch (error) {
        console.log('Error al subir la imagen: ', error);
        throw error;
    }
};
