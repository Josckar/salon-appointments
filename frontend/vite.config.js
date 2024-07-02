import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
const viteConfig = defineConfig({

  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: import.meta.env.VITE_APP_PORT || 5173,
    overlay: true,
  },
});

export default viteConfig;