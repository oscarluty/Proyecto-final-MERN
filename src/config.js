const isProduction = import.meta.env.PROD;

export const API_URL = isProduction
  ? import.meta.env.VITE_API_URL || "www.arrierombarete.com"
  : "http://localhost:4000/api";

console.log(`Frontend running in ${isProduction ? 'production' : 'development'} mode`);
console.log(`API_URL: ${API_URL}`);