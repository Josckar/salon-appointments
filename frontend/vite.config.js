import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
const viteConfig = defineConfig({

  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 10000,
    overlay: true,
    hmr: {
        // Use secure WebSocket if your site is served over HTTPS
        protocol: 'wss',
        // Replace 'salon-appointments-8e5a.onrender.com' with your actual public server address
        host: 'salon-appointments-8e5a.onrender.com',
      },
  },
});

export default viteConfig;