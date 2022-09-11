import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    },
    // 导入时想要省略的扩展名列表
    extensions: ['.ts', 'tsx', '.js', '.jsx'],
  },
  plugins: [react(), svgr({
    svgrOptions: {
      icon: '1em'
    }
  })],

})
