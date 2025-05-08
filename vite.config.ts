/// <reference types="node" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    optimizeDeps: {
      include: ['@tanstack/react-table', 'lucide-react'],
      exclude: [],
    },
    build: {
      commonjsOptions: {
        include: [/node_modules/],
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.API_BASE_URL.trim(),
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy) => {
            proxy.on('error', (err) => {
              console.error('[Proxy Error]', err);
            });
            proxy.on('proxyReq', (proxyReq, req) => {
              // Log the full URL being requested
              const fullUrl = new URL(req.url || '', env.API_BASE_URL.trim()).href;
              console.log('[Proxy Request]', req.method, fullUrl);
              
              // Set proper headers
              proxyReq.setHeader('Accept', 'application/json');
              proxyReq.setHeader('Content-Type', 'application/json');
            });
            proxy.on('proxyRes', (proxyRes, req) => {
              console.log('[Proxy Response]', proxyRes.statusCode, req.url);
            });
          },
        },
        '/proxy': {
          target: env.API_BASE_URL.trim(),
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/proxy/, ''),
          configure: (proxy) => {
            proxy.on('error', (err) => {
              console.error('[Proxy Error]', err);
            });
            proxy.on('proxyReq', (proxyReq, req) => {
              // Log the full URL being requested
              const fullUrl = new URL(req.url || '', env.API_BASE_URL.trim()).href;
              console.log('[Proxy Request]', {
                method: req.method,
                url: fullUrl,
                headers: proxyReq.getHeaders()
              });
              
              // Check if this is a photograph request
              if (req.url && req.url.includes('/profileUpdate/photograph')) {
                // For photograph requests, set appropriate headers for image content
                proxyReq.setHeader('Accept', 'image/jpeg, image/png, image/*, */*');
                // Don't set Content-Type for GET requests to images
                if (req.method !== 'GET') {
                  proxyReq.setHeader('Content-Type', 'application/json');
                }
              } else {
                // For all other requests, use default JSON headers
                proxyReq.setHeader('Accept', 'application/json');
                proxyReq.setHeader('Content-Type', 'application/json');
              }
            });
            proxy.on('proxyRes', (proxyRes, req) => {
              console.log('[Proxy Response]', {
                statusCode: proxyRes.statusCode,
                url: req.url,
                headers: proxyRes.headers
              });
            });
          },
        },
      },
    },
  };
});
