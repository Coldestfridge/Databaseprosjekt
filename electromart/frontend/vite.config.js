import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    preview: {
        host: '0.0.0.0',
        port: 3000,
        strictPort: true,
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8000', // Backend server URL
                changeOrigin: true,
            },
        },
    },
    build: {
        outDir: '../frontend/dist',
        emptyOutDir: true,
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
});
