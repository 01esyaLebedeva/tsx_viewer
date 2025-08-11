import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { version } from './package.json'

export default defineConfig({
  base: './',
  plugins: [react(), basicSsl()],
  publicDir: 'public',
  server: {
    port: 8081,
  },
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
});