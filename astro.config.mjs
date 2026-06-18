import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import vercel from '@astrojs/vercel/static';

// https://astro.build
export default defineConfig({
  site: 'https://eyeqhawaii.com',
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
    icon({ iconDir: 'src/icons' }),
  ],
  vite: {
    // Ensure a single React instance for hydrated islands (avoids null-dispatcher hook errors).
    resolve: { dedupe: ['react', 'react-dom'] },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react/jsx-runtime', 'lucide-react'],
    },
  },
});
