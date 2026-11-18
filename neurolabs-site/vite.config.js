import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// lets /admin open admin.html in dev (Cloudflare Pages does the same in production)
const adminRoute = () => ({
  name: 'admin-route',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => { if (req.url === '/admin' || req.url === '/admin/') req.url = '/admin.html'; next(); });
  },
});

export default defineConfig({
  plugins: [adminRoute()],
  server: {
    port: 5173,
    host: true,
    // API (Cloudflare Pages Functions) runs on wrangler at :8788 during development
    proxy: { '/api': 'http://127.0.0.1:8788', '/media': 'http://127.0.0.1:8788' },
  },
  build: {
    outDir: 'dist',
    target: 'es2022',
    chunkSizeWarningLimit: 1200,
    rollupOptions: { input: { main: resolve(__dirname, 'index.html'), admin: resolve(__dirname, 'admin.html') } },
  },
});
