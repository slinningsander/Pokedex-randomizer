/// <reference types="vitest" />
//vite/client  reference is poorly documented by Vitest, but seems to be needed for our purposes
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    //allows for use of Vitest methodes without import:
    globals: true,
    //defines testing environemnt for testing web-apps as:
    environment: 'jsdom',
    //allows for parsing css, so can test css properties if needed:
    css: true,
  },
});
