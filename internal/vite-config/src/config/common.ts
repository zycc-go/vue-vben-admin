import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { type UserConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

const commonConfig: UserConfig = {
  server: {
    host: true,
  },

  build: {
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1500,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@vben/design/shared";`,
      },
    },
  },
  plugins: [vue(), vueJsx(), cssInjectedByJsPlugin()],
};

export { commonConfig };
