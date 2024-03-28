import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

// import { defineConfig } from 'vite';
// import { createServer } from 'vite';

// export default defineConfig({
//   server: {
//     proxy: {
//       '/api': 'http://localhost:3001',
//     },
//   },
// });

