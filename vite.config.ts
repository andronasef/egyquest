import react from '@vitejs/plugin-react'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/egyquest',
  plugins: [react(), Icons({ compiler: 'jsx', jsx: 'react' }),
  ],
})
