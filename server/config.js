export const PORT = process.env.PORT || 4000;
export const TOKEN_SECRET = process.env.TOKEN_SECRET || 'some_secret_key_muy_seguro_y_largo';
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://oscarluty:J67lA0E9zlBFzCqb@arrierocluster.elbacgd.mongodb.net/arrierodb';

export const isProduction = process.env.NODE_ENV === 'production';

export const FRONTEND_URL = isProduction
  ? process.env.FRONTEND_URL || "https://serene-meadow-83357-d161acbcd0d7.herokuapp.com"
  : "http://localhost:3004";

export const API_URL = isProduction
  ? process.env.API_URL || "https://serene-meadow-83357-d161acbcd0d7.herokuapp.com/api"
  : "http://localhost:4000/api";

if (isProduction) {
  console.log('Running in production mode');
  console.log(`FRONTEND_URL: ${FRONTEND_URL}`);
  console.log(`API_URL: ${API_URL}`);
} else {
  console.log('Running in development mode');
}