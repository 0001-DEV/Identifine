import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

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
        const timer = setTimeout(() => controller.abort(), 10000);

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
  plugins: [
    react(),
    wpApiPlugin(),
    ViteImageOptimizer({
      // Convert JPG and PNG to WebP
      jpg: { quality: 85 },
      jpeg: { quality: 85 },
      png: { quality: 85 },
      webp: { lossless: false, quality: 85 },
      // Convert JPG/PNG assets to WebP format
      includePublic: true,
      logStats: true,
    }),
  ],
  server: {
    port: 3000,
    open: false
  },
  preview: {
    port: 4173
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
          admin: [
            './src/pages/WordPressAdminShell.jsx',
            './src/admin/DashboardHome.jsx',
            './src/admin/AllPostsPanel.jsx',
            './src/admin/NewPostPanel.jsx',
            './src/admin/CategoriesPanel.jsx',
            './src/admin/TagsPanel.jsx',
            './src/admin/MediaLibraryPanel.jsx',
            './src/admin/CommentsPanel.jsx',
            './src/admin/RankMathDashboard.jsx',
            './src/admin/RankMathGeneralSettings.jsx',
            './src/admin/RankMathTitlesMeta.jsx',
            './src/admin/RankMathSitemap.jsx',
            './src/admin/RankMathRoleManager.jsx',
            './src/admin/SettingsPermalinks.jsx',
            './src/admin/UsersPanel.jsx',
            './src/admin/PluginsPanel.jsx',
            './src/admin/AppearancePanel.jsx',
            './src/admin/PagesPanel.jsx',
          ],
        },
      },
    },
  },
});


