import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_API_BASE_URL: apiTarget } = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: apiTarget
      ? {
          proxy: {
            '/api': {
              target: apiTarget,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api(?=\/|$)/, ''),
              configure: (proxy) => {
                proxy.on('proxyReq', (request) => request.removeHeader('origin'));
              },
            },
          },
        }
      : undefined,
  };
});
