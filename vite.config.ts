import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr({ include: 'src/**/*.svg' })],
    resolve: {
        alias: {
            src: path.resolve(__dirname, './src')
        }
    },
    server: {
        open: true
    }
});
