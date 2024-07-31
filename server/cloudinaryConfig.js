import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import {
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_CLOUD_NAME
} from "./config.js";

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

export const testCloudinaryConnection = () => {
    return new Promise((resolve, reject) => {
        cloudinary.api.ping((error, result) => {
            if (error) {
                console.error('Error conectando con Cloudinary:', error);
                reject(error);
            } else {
                console.log('Conexión exitosa con Cloudinary');
                resolve(result);
            }
        });
    });
};

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'arriero', // La carpeta en Cloudinary donde se guardarán las imágenes
        allowed_formats: ['jpg', 'png', 'jpeg'] // Formatos permitidos
    }
});

export { cloudinary, storage };