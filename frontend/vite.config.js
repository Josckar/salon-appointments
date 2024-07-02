import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
const viteConfig = defineConfig({

  plugins: [react()],
  envDir: '../',
  server: {
    host: '0.0.0.0',
    port: '5173',
    overlay: true,
  },
});

export default viteConfig;