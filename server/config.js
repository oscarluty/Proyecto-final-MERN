export const PORT = process.env.PORT || 4000;
export const TOKEN_SECRET = process.env.TOKEN_SECRET || 'some_secret_key_muy_seguro_y_largo';
export let FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3004";
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://oscarluty:J67lA0E9zlBFzCqb@arrierocluster.elbacgd.mongodb.net/arrierodb';

// Añade esta nueva constante para la URL de la API
export const API_URL = process.env.API_URL || "http://localhost:4000/api";

// Función para determinar si estamos en producción
export const isProduction = process.env.NODE_ENV === 'production';

// Si estamos en producción, usar la URL de Heroku como FRONTEND_URL por defecto
if (isProduction && !process.env.FRONTEND_URL) {
  console.warn('FRONTEND_URL not set in production. Using default Heroku URL.');
  FRONTEND_URL = "https://serene-meadow-83357-d161acbcd0d7.herokuapp.com";
}