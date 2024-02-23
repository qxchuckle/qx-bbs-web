import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// 自动加载组件
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router', 'pinia'],
      dirs: ['src/**'],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dirs: ['src/components/**'],
      extensions: ['vue'],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    hmr: true,
    port: 3002,
    proxy: {
      '/api': {
        target: 'http://localhost:7072',
        changeOrigin: true,
      },
    },
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 引入全局scss变量
        additionalData: `@use "@/assets/css/var.scss" as *;`,
      },
    },
  },
});
