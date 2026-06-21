import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  ssr: {
    noExternal: ['react-router-dom', 'react-helmet-async'],
  },
});
