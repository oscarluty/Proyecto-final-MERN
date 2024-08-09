import { API_URL } from "../config";

export const createContacto = async (contactoData) => {
    try {
        const response = await fetch(`${API_URL}/contactos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contactoData),
        });
        if (!response.ok) {
            throw new Error("Error al crear el contacto");
        }
        return await response.json();
    } catch (error) {
        console.log('Error al crear el contacto', error);
        throw error;
    }
}