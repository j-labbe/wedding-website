import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import lqip from 'vite-plugin-lqip'
import svgr from 'vite-plugin-svgr'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        lqip(),
        svgr(),
        ViteImageOptimizer({
            // Optimize images in the assets folder
            test: /\.(jpe?g|png|gif|webp|svg)$/i,
            includePublic: false,
            logStats: true,
            // JPEG optimization
            jpg: {
                quality: 80,
                mozjpeg: true,
            },
            jpeg: {
                quality: 80,
                mozjpeg: true,
            },
            // PNG optimization
            png: {
                quality: 80,
            },
            // WebP generation
            webp: {
                quality: 80,
            },
            // AVIF generation (best compression, modern format)
            avif: {
                quality: 70,
            },
            // Enable auto-orient to fix rotation issues
            cache: false,
            cacheLocation: undefined,
        }),
    ],
})
