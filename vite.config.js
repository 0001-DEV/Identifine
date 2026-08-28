import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Custom quiet proxy plugin for WordPress API
 * Replaces default Vite proxy to cleanly handle DNS (ENOTFOUND) and connection (ETIMEDOUT) errors
 * without polluting the terminal console with raw error logs.
 */
function wpApiPlugin() {
  return {
    name: 'wp-api-proxy',
    configureServer(server) {
      server.middlewares.use('/wp-api', async (req, res) => {
        const targetUrl = `https://identifine.com.ng/wp-json/wp/v2${req.url}`;
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 2500);

        try {
          const wpRes = await fetch(targetUrl, { signal: controller.signal });
          clearTimeout(timer);

          res.statusCode = wpRes.status;
          res.setHeader('Content-Type', wpRes.headers.get('content-type') || 'application/json');

          const arrayBuffer = await wpRes.arrayBuffer();
          res.end(Buffer.from(arrayBuffer));
        } catch (err) {
          clearTimeout(timer);
          res.statusCode = 503;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'WordPress API Offline', message: err.message }));
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), wpApiPlugin()],
  server: {
    port: 3000,
    open: false
  },
  preview: {
    port: 4173
  }
});


