import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.trilliant.uz',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      // TRILLIANT_SEO_INDEXING_V1
      filter: (page) => !page.includes('/admin/') && !page.includes('/admin-login/'),
      i18n: {
        defaultLocale: 'ru',
        locales: { ru: 'ru-RU', uz: 'uz-UZ', en: 'en-US' },
      },
      serialize(item) {
        const pathname = new URL(item.url).pathname;
        const isHome = pathname === '/' || pathname === '/uz/' || pathname === '/en/';
        item.changefreq = isHome ? 'weekly' : 'monthly';
        item.priority = isHome ? 1 : 0.8;
        return item;
      },
    }),
  ],
});