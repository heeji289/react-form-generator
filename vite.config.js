import { defineConfig } from 'vite';
import path from 'path';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  plugins: [vanillaExtractPlugin()],
  // esbuild: {
  //   jsxFactory: 'createElement',
  //   jsxFragment: 'Fragment',
  //   jsxInject: `import { createElement, Fragment } from '@/src/mini-react/jsx-transpiler'`,
  // },
});
