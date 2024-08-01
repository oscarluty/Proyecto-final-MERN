import { API_URL } from "../config"

export const fetchCarrusel = async () => {
    try {
        const response = await fetch(API_URL+'/carrusels');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }catch (error) {
        console.error('Error fetching carrusel:', error);
    if (error instanceof TypeError && error.message.includes('CORS')){
        console.log('Error de CORS detectado. Por favor checkear configuracion CORS en el server');
    }
    throw error;
    }
}