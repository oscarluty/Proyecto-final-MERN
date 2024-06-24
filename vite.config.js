import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // O tu dirección IP local, por ejemplo '192.168.1.10'
    port: 3004,
  }
})
